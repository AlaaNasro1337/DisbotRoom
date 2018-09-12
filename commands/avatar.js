const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
 exports.run = function (client, message, args, args2, cmd, config) {
    var guild = message.guild;
        message.channel.send("Here is your avatar: \n")
        message.channel.send(message.author.avatarURL);
        logger.log('info', `Avatar command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
 };