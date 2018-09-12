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
        .setDescription("**Command: **" + `${config.prefix}triangle`)
        .addField("**Usage:**", `${config.prefix}triangle <number 1> <number 2> <number 3>`)
        .addField("**Example:**", `${config.prefix}triangle 1 2 3`)
        .addField("**Expected Result From Example:**", "Should return whether the entered values make a triangle.")
    if (args.join(' ') == "") return message.channel.send({ embed: embed1 })
    var guild = message.guild;
    var a = parseInt(args[0]);
    var b = parseInt(args[1]);
    var c = parseInt(args[2]);
    if (a + b > c && a + c > b && b + c > a) {
        message.channel.send("Makes a triangle")
    }
    else {
        message.channel.send("Does not make a triangle")
    }
    logger.log('info', `triangle command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
}