const { morse } = require('../util.js')
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    const config = require("../config.json");
    const Discord = require('discord.js');
    var guild = message.guild;
    const embed1 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}morse`)
        .addField("**Usage:**", `${config.prefix}morse <text>`)
        .addField("**Example:**", `${config.prefix}morse hello`)
        .addField("**Expected Result From Example:**", ":smile: :smile: :smile: :smile::smile::smile: :eggplant: :smile: :smile::smile: :eggplant: :smile: :smile::eggplant: :eggplant: :eggplant:")
    if (args.join(' ') == "") return message.channel.send({embed: embed1})
    let morsed = morse(args.join(' ')) //if in exports.run, need to put morse const from line front
    if (morsed.length > 0) {
        message.channel.send("🍆 Means -")
        message.channel.send("😄 Means ·\n\n")
        message.channel.send(morsed)
    } else if (morsed.length > 1500) {  //can be caped @ 2000
        message.reply("Your message has been flaged for spam, therefore it won't send")
    } else {
        message.reply("Input cannot be empty :frowning:");

    }
    logger.log('info', `Morse command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
};