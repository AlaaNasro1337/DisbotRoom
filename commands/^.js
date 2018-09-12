const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd, res) {
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}^`)
        .addField("**Usage:**", `${config.prefix}^ <num base> <exponent value>`)
        .addField("**Example:**", `${config.prefix}^ 2 3`)
        .addField("**Expected Result From Example:**", "8")
    if (args2 == "" || args == "") return message.channel.send({ embed: embed });
    var res = args[0];
    var answer = Math.pow(res, args2.join(' '));
    message.channel.send(answer);
    logger.log('info', `^ command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
};