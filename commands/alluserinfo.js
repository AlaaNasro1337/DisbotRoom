const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
const config = require("../config.json");
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    if (message.author.id === config.owner) {
        console.log(client.users)
        localStorage.setItem('All-User-Information.json', client.users.map(e => e.toString()).join(" "));
        message.channel.send({ files: ['All-User-Information.json'] });
    }
    else {
        message.channel.send("You do not Bot Owner Permissions to Use this Command!")
    }
    logger.log('info', `Alluserinfo command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
}