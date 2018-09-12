const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var output = "";
    const Discord = require('discord.js')
    const config = require("../config.json");
    var guild = message.guild;
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}binary`)
        .addField("**Usage:**", `${config.prefix}binary <text>`)
        .addField("**Example:**", `${config.prefix}binary hello`)
        .addField("**Expected Result From Example:**", "1101000 1100101 1101100 1101100 1101111")
    if (args.join(' ') == "") return message.channel.send({embed: embed})
    var input = args.join(' ') //converting all input in to one element of a array.
    // var array = input
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " "; //tostring reverse enginerners hex to binary.
    }
    message.channel.send(output)
    logger.log('info', `Binary command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
};