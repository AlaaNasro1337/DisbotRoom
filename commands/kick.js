const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    logger.log('info', `Kick command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
    let reason = args.slice(1).join(' ');
    const Discord = require('discord.js');
    let user = message.mentions.users.first()
    let member = message.guild.member(user)
   
    const config = require("../config.json");
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}kick`)
        .addField("**Usage:**", `${config.prefix}kick <@username> <reason>`)
        .addField("**Example:**", `${config.prefix}kick @AirFusion STAPPP!!!! >.<`)
        .addField("**Expected Result From Example:**", "Specified User Should Be Kicked; Kick Log Should Be Sent To Channel #modlog")
    if (message.mentions.users.size < 1 && reason.length < 1) return message.channel.send({ embed: embed })
    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return message.reply('You must be a moderator to kick people!').catch(console.error)
    if (message.mentions.users.size < 1) return message.reply('Please mention someone to kick!').catch(console.error)
    if (reason.length < 1) return message.reply('Please supply a reason for the kick!').catch(console.error)
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('I do not have the correct permissions!').catch(console.error)
    if (user === message.author) return message.reply("You cannot kick yourself")
    if (message.guild.member(member) && member.kickable) {
        const channelsendlol = new Discord.RichEmbed()
            .setColor('#ff8c00') //change the color!!!
            .setTimestamp()
            .setThumbnail(user.avatarURL)
            .addField('Action:', "Kick")
            .addField('User:', user.username + '#' + user.discriminator)
            .addField("User ID:", user.id)
            .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
            .addField("Reason:", reason)
            .addField("Server:", message.guild)
        //  console.log(channelsendlol)



        // user.send('You have been kicked');
        const okgoogle = new Discord.RichEmbed() // modlog send
            .setColor('#ff8c00') //change the color!!!
            .setTimestamp()
            .setThumbnail(user.avatarURL)
            .addField('Action:', "Kick")
            .addField('User:', user.username + '#' + user.discriminator)
            .addField("User ID:", user.id)
            .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
            .addField("Reason:", reason)
        //  .addField('Kicked User ID: ', `${message.mentions.users.first().id}`)

        // console.log(okgoogle)

        //message.channel.send("\n\n")
        setTimeout(function () {
            message.guild.member(user).kick().catch(err => console.error(err))
        }, 1000);

        message.channel.send({ embed: okgoogle })
        user.send({embed: channelsendlol})
        guild.channels.find("name", "modlog").send({ embed: okgoogle }).catch(err => console.err(err));
      
    }
    else {
        message.reply(":x: I can not kick " + user)
    }


};