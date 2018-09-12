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
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}sqrt`)
        .addField("**Usage:**", `${config.prefix}sqrt <number>`)
        .addField("**Example:**", `${config.prefix}sqrt 4`)
        .addField("**Expected Result From Example:**", "2")
    if (args.join(' ') == "") return message.channel.send({ embed: embed19 })
    let inpuit = args;
    let answer = Math.sqrt(inpuit)
    message.channel.send(answer);
    logger.log('info', `Sqrt command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
};