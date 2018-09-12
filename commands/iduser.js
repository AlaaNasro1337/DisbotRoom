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
        .setDescription("**Command: **" + `${config.prefix}iduser`)
        .addField("**Usage:**", `${config.prefix}iduser <user id>`)
        .addField("**Example:**", `${config.prefix}iduser 304431822941454339`)
        .addField("**Expected Result From Example:**", "FireBirds!™#4852")
    if (args.join(' ') == "") return message.channel.send({ embed: embed1 })
    if (!client.users.get(args.join(' '))) return message.reply("No such user on file.")
    message.channel.send(client.users.get(args.join(' ')).username + "#" + client.users.get(args.join(' ')).discriminator);

    logger.log('info', `Iduser command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

}