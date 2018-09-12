const main = require('../index.js')
const chalk = require('chalk');
const config = require("../config.json");
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd, cmd2) {
    var guild = message.guild;
    if (message.author.id === config.owner) {
        if (!args || args.size < 1) return message.reply("Must provide a command name to reload.");
        // the path is relative to the *current folder*, so just ./filename.js
        // delete require.cache[require.resolve(`./${args[0]}.js`)];
        delete require.cache[require.resolve(`./${args.join(' ')}.js`)];
        message.reply(`:white_check_mark: The command ${args[0]} has been reloaded`);
    }
    else {
        message.reply(":x: Insufficant Permissions!")
    }
    logger.log('info', `Reload command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
};