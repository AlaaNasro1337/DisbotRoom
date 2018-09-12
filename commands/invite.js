const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})


exports.run = function (client, message, args, args2) {

    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;

    const embed = new Discord.RichEmbed()
        .setColor("#00ffff")
        .setTimestamp()
        .setFooter("Invite Link for " + config.name)
        .addField(`Invite link:`, `[Here](${config.invLink}) | Thanks for inving ${config.name}!`)

    message.channel.send({embed: embed})
    logger.log('info', `Invite command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
}