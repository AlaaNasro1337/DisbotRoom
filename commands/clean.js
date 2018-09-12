const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    const Discord = require('discord.js');
    const config = require("../config.json");
    const embed1000009 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}clean`)
        .addField("**Usage:**", `${config.prefix}clean <number of messages to be cleaned of reactions>`)
        .addField("**Example:**", `${config.prefix}clean 1`)
        .addField("**Expected Result From Example:**", "one message should be cleaned of reactions")
    if (args.join(' ') === "") return message.channel.send({ embed: embed1000009 })
 message.channel.fetchMessages({ limit: parseInt(parseInt(args.join(' '))+1, 10) }).then(messagelog => {
            setTimeout(message.delete.bind(message), 2000);
            messagelog.forEach(message => {
                message.clearReactions();

            });
        });
        logger.log('info', `Clean command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
}