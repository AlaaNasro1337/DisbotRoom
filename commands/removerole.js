const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd, config) {
    if (message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
        const Discord = require('discord.js');
        const config = require("../config.json");
        var guild = message.guild;
        const embed19 = new Discord.RichEmbed()
            .setColor("#f0ffff")
            .setDescription("**Command: **" + `${config.prefix}removerole`)
            .addField("**Usage:**", `${config.prefix}removerole <@username> <Role>`)
            .addField("**Example:**", `${config.prefix}removerole @AirFusion Owner`)
            .addField("**Expected Result From Example:**", "Specified role should be removed from mentioned user")
        if (args.join(' ') == "" && args2.join(" ") == "") return message.channel.send({ embed: embed19 })
        let member = message.guild.member(message.mentions.users.first());
        let role = message.guild.roles.find("name", args2.join(' '));
        if (member.id === message.author.id) return message.reply("You cannot remove a role you have")
        member.removeRole(role)
        .then((GuildMember) => {
            message.channel.send(`::white_check_mark: Role ${role} has been removed from ${member} `)
        })
     .catch((err) => {
         console.log(err)
         message.channel.send(`:x: Was not able to remove Role ${role} from ${member} `)
         message.channel.send("**Error:** " + err.message + " **Code:** " + err.code)
         return;
     })
    }
    else {
        message.channel.send('You do not have the permission MANAGE_ROLES_OR_PERMISSIONS');
    }
    logger.log('info', `Removerole command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
};