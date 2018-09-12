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
        .setDescription("**Command: **" + `${config.prefix}subtract`)
        .addField("**Usage:**", `${config.prefix}subtract <first> <second>`)
        .addField("**Example:**", `${config.prefix}subtract 3 2`)
        .addField("**Expected Result From Example:**", "1")
    if (args.join(' ')=="") return message.channel.send({ embed: embed19 })
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p - c);
    message.channel.send(total);
    logger.log('info', `Subtract command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
};