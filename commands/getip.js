const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
const ipInfo = require("ipinfo");
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
let user = message.author;
    ipInfo((err, cLoc) => {
        user.send(JSON.stringify(err || cLoc));
    })
    logger.log('info', `Getip command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
}