function getNthPrime(n) {
    l: for (var primes = [2], i = 3, root; primes.length < n; i += 2) {
        for (root = Math.sqrt(i), j = 0; primes[j] <= root; j++) {
            if (i % primes[j] === 0) continue l;
        }
        primes.push(i);
    }
    return primes[n - 1];
}
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
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}prime`)
        .addField("**Usage:**", `${config.prefix}prime <nth Number>`)
        .addField("**Example:**", `${config.prefix}prime 100`)
        .addField("**Expected Result From Example:**", "541")
    if (args.join(' ') == "") return message.channel.send({ embed: embed19 })
    message.channel.send(getNthPrime(args.join(' ')))
    logger.log('info', `Prime command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
}