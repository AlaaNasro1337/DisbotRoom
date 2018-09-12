const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
const ipInfo = require("ipinfo");
exports.run = function (client, message, args, args2, cmd) {
    let user = message.author;
    const Discord = require('discord.js')
    const config = require("../config.json");
    var guild = message.guild;
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}iplookup`)
        .addField("**Usage:**", `${config.prefix}iplookup <ip address>`)
        .addField("**Example:**", `${config.prefix}iplookup 8.8.8.8`)
        .addField("**Expected Result From Example:**", "Commands should return mentioned ip address's information.")
    if (args.join(' ') === "") {
        return message.channel.send({ embed: embed });
    }
    else if (args.join(' ') != ""){
        ipInfo(args.join(' '), (err, cLoc) => {
            user.send(JSON.stringify(err || cLoc));
        });
    }
    logger.log('info', `Iplookup command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
}