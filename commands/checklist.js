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
    const embed100 = new Discord.RichEmbed()
        .setTitle("If a role is true, means you have the role setup correctly, if it is false, then there is something wrong with the role.")
        .setColor('#ff0000')
        .setFooter(config.name + "CheckList")


    let powerbotperm = client.guilds.get(message.guild.id).roles.find("name", "PowerBot")
    let powerbotadmintf = false;
    embed100.addField("PowerBot ADMINISTRATOR Permissions: ", powerbotperm.hasPermission("ADMINISTRATOR"))

    let muteRole = client.guilds.get(message.guild.id).roles.find("name", "Mute")
    let mute = true;
    if (!muteRole) mute = false;
    embed100.addField("PowerBot Mute Role (role required for mute command to function): ", mute)
    message.channel.send({ embed: embed100 });

    logger.log('info', `checklist command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
};