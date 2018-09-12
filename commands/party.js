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
    var congablob = client.emojis.find("name", "432480321850834945conga")
    var hype = client.emojis.find("name", "432480321850834945hype")
    var ditto = client.emojis.find("name", "420406277664145428ditto")
    var parrot = client.emojis.find("name", "432480321846509569parrot")
    var shield = client.emojis.find("name", "393609342215258112shield")

    message.channel.send(shield + shield + shield + shield + shield + "\n" + congablob + congablob + congablob + congablob + congablob + "\n" + hype + ditto + hype + ditto + hype + "\n" + parrot + congablob + congablob + congablob + parrot + "\n" + shield + shield + shield + shield + shield)
    logger.log('info', `party command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
};