const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}avasteal`)
        .addField("**Usage:**", `${config.prefix}avasteal <@username>`)
        .addField("**Example:**", `${config.prefix}avasteal @AirFusion`)
        .addField("**Expected Result From Example:**", "Bot Should Return a Avatar Link To The Specified User")
    if (!message.mentions.users.first()) return message.channel.send({ embed: embed })
    message.channel.send(message.mentions.users.first().avatarURL);
    logger.log('info', `Avasteal command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
};