const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    let user = message.mentions.users.first();
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}game`)
        .addField("**Usage:**", `${config.prefix}game <@user>`)
        .addField("**Example:**", `${config.prefix}game @AirFusion`)
        .addField("**Expected Result From Example:**", "Should return the mentioned user's current game")
    if (args.join(' ') == "") return message.channel.send({ embed: embed1 })
    message.channel.send(user.presence.game.name);
    logger.log('info', `Game command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()} Guild: ${guild}`)
}