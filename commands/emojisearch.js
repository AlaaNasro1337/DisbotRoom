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
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}emojisearch`)
        .addField("**Usage:**", `${config.prefix}emojisearch <name>`)
        .addField("**Example:**", `${config.prefix}embed smile`)
        .addField("**Expected Result From Example:**", "Shoud return the custom emoji in the server named smile.")
    if (args.join(' ') == "") return message.channel.send({ embed: embed1 })
    const search = client.emojis.find("name", args.join(' '));
    message.channel.send(`${search}`);
    logger.log('info', `Emojisearch command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
}