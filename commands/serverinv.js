const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
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
    getDefaultChannel(message.guild).createInvite({ maxAge: 300 }).then(inv => message.channel.send(inv.url ? inv.url : "discord.gg/" + inv.code))
    logger.log('info', `Serverinv command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

}