const randomWord = require('random-word');
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2) {
    var guild = message.guild;
message.channel.send(randomWord())
logger.log('info', `Randword command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    

}