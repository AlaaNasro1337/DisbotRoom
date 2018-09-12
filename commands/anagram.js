const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var first = args.join(' ');
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}anagram`)
        .addField("**Usage:**", `${config.prefix}anagram <first word> <second word>`)
        .addField("**Example:**", `${config.prefix}anagram aaab baaa`)
        .addField("**Expected Result From Example:**", "Anagram")
    var second = args2.join(' ');
    if (!first || !second) return message.channel.send({embed: embed})
        // message.channel.send("You need to provide the first word!")
        // stop();
    
    // else if (!second) {
    //     message.channel.send("You need to provide the second word!")
    //     stop();
    // }
    first = first.replace(second, "")
    first = first.replace(" ", "")
    var reverse = first.split("").reverse().join("");

    if (reverse === second) {
        message.channel.send("Anagram");
    } else {
        message.channel.send("Not Anagram");
    }
    logger.log('info', `Anagram command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
};