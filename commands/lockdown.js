const ms = require('ms');
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    let guild = message.guild;
    logger.log('info', `Lockdown command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`) 
    const Discord = require('discord.js');
    // let modlog = client.channels.find("name", "modlog")
    let member = message.author;
   const config = require("../config.json");
   

    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **"+ `${config.prefix}lockdown`)
        .addField("**Usage:**", `${config.prefix}lockdown <time for ex: 1m, 1h etc>`)
        .addField("**Example:**", `${config.prefix}lockdown 1m`)
        .addField("**Expected Result From Example:**", "All Channels should enter a lockdown mode, all moderators and above should not be affected.")
    if (args.join(' ') == "") return message.channel.send({embed: embed1})

    if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.reply('Insufficant Permissions').catch(console.error)
    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');
    const embed = new Discord.RichEmbed()
        .setColor('##cb4154') //change the color!!!
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', "Lockdown")
        .addField('Duration/Time:', time)
        .addField("Moderator:", message.author.username + "#" + message.author.discriminator)
//    message.guild.channels.find()

        // member.guild.channels.find("name", "modlog").send({ embed: embed }).catch(e);

        // guild.channels.find("name", "modlog").send({embed: embed}).catch(e);
        
    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.send('Lockdown lifted.');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(`Channel locked down for ${ms(ms(time), { long: true })}`).then(() => {

                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(message.channel.send('Lockdown lifted.')).catch(console.error);
                    delete client.lockit[message.channel.id];
                }, ms(time));

            }).catch(error => {
                console.log(error);
            });
        });
    }


    message.guild.channels.find("name", "modlog").send({embed: embed}).catch(err => console.error(err));   
};
