const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    logger.log('info', `Warn command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)  
    if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Insufficant Permissions').catch(console.error)
    const Discord = require('discord.js');
    const config = require("../config.json");
    let reason = args.slice(1).join(' ')
    let user = message.mentions.users.first()
    let member = message.guild.member(user)
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}warn`)
        .addField("**Usage:**", `${config.prefix}warn <@username> <reason>`)
        .addField("**Example:**", `${config.prefix}warn @AirFusion STAP!`)
        .addField("**Expected Result From Example:**", "Mentioned user should be warned.")
    if (args.join(' ') == "" && args2.join(" ") == "") return message.channel.send({ embed: embed19 })
    // let guild = member.guild;
    // let modlog = guild.channels.find("name", "modlog")
    // if (!modlog) return message.reply("mod-log required")
    if (reason.length < 1) return message.reply("Reason Required")
    if (message.mentions.users.size < 1) return message.reply("You must mention someone to warn them.").catch(console.error)
    if (user === message.author) return message.reply("You cannot warn yourself")
    const embed = new Discord.RichEmbed()
        .setColor('#ff9966') //change the color!!!
        .setTimestamp()
        .setThumbnail(user.avatarURL)
        .addField('Action:', "Warning")
        .addField('User:', user.username + '#' + user.discriminator)
        .addField("User ID:", user.id)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
        .addField("Reason:", reason)
        .addField("Server:", message.guild)
       
    const embed1 = new Discord.RichEmbed()
        .setColor('#ff9966') //change the color!!!
        .setTimestamp()
        .setThumbnail(user.avatarURL)
        .addField('Action:', "Warning")
        .addField('User:', user.username + '#' + user.discriminator)
        .addField("User ID:", user.id)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
        .addField("Reason:", reason)
    message.channel.send({ embed: embed1 })
    user.send({embed: embed})
    guild.channels.find("name", "modlog").send({ embed: embed1 }).catch(err => console.error(err));
};
