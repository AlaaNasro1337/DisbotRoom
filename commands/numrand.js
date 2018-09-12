function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
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
        .setDescription("**Command: **" + `${config.prefix}numrand`)
        .addField("**Usage:**", `${config.prefix}numrand <Low Number> <High Number>`)
        .addField("**Example:**", `${config.prefix}numrand 1 100`)
        .addField("**Expected Result From Example:**", "Will return a random number between 1 and 100")
    if (args.join(' ') == "" && args2.join(" ") == "") return message.channel.send({ embed: embed19 })
    var low = args.shift();
    var ans = getRandomIntInclusive(low, args2.join(' '));
    if (!low) return message.reply("You need a low range number");
    if (!args2.join(' ')) return message.reply("You need a high range number");
    message.channel.send(ans)
    logger.log('info', `Numrand command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
}
