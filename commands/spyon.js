const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const config = require("../config.json");
    var guild = message.guild;
    function getDefaultChannel(guild) {
        // if(guild.channel.has(guild.id))
        // return guild.channels.get(guild.id)

        if (guild.channels.exists("name", "general"))
            return guild.channels.find("name", "general");

        // Now we get into the heavy stuff: first channel in order where the bot can speak
        // hold on to your hats!
        return guild.channels
            .filter(c => c.type === "text" &&
                c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
            .sort((a, b) => a.position - b.position ||
                Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
            .first();
    }
    if (message.author.id === config.owner) {
        try {
            getDefaultChannel(client.guilds.find("name", args.join(' '))).createInvite({ maxAge: 30 }).then(inv => message.channel.send(inv.url ? inv.url : "discord.gg/" + inv.code))
        } catch (error) {
            console.log(error)
            message.reply(' they don\'t allow me to generate invites :(')
        }
    } else {
        message.reply(" only AirFusion gets to spy on servers, sorry.")
    }
    logger.log('info', `Spyon command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

}


/*
if client.guilds.find("name", args.join(' ')) finds no server that the bot is in under the name of <input/args.join> then it will return null!
!!!bot needs to be in server...
!put it on a selfbot
NOTE: Try eval following command:
-eval client.guilds.find("name", "<servername>").defaultChannel.createInvite({ maxAge: 30  }).then(inv => message.channel.send(inv.url ? inv.url : "discord.gg/" + inv.code))
*/