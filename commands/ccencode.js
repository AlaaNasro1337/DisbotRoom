function encode(ch, shift) { //hi returns QR first if has a problem 
    var x = parseInt(ch.charCodeAt(0));
    //console.log(x)
    var temp = 0;
    if (x >= 65 && x <= 90 || x == 32) {
        if (x == 32) {
            return ' '
        }
        else if (x + shift > 90) {
            temp = shift - (90 - x)
            x = 64 + temp
        }
        else {
            x = x + shift
        }
        return String.fromCharCode(x)
    }
    else if (x >= 97 && x <= 122 || x == 32) {
        if (x == 32) {
            return ' '
        }
        else if (x + shift > 122) { //parseint!
            //console.log(x + shift)
            temp = shift - (122 - x)
            x = 96 + temp
        }
        else {
            x = x + shift
        }
        // console.log(x)
        // console.log(String.fromCharCode(x))
        return String.fromCharCode(x) //107(k)
    }
}
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    var guild = message.guild;
    var string = args.join(' ') //problem with slice
    var shift = parseInt(args2.join(' '))
    var array = string
    const Discord = require('discord.js')
    const config = require("../config.json");
    const embed = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}ccencode`)
        .addField("**Usage:**", `${config.prefix}ccencode <decode text> <shift/password>`)
        .addField("**Example:**", `${config.prefix}ccencode hello 3`)
        .addField("**Expected Result From Example:**", "Your answer is khoor")
    if (!string && !shift) return message.channel.send({ embed: embed })
    if (!string) return message.reply("You need to fill in a string")
    if (!shift) return message.reply("You need to fill in a shift")

    //var array = temparray[0].split()
    var res = ""
    if (shift > 25) {
        shift = shift % 26;
    }
    for (var i = 0; i < string.length; i++) {
        // console.log(array[i])
        res += encode(array[i], shift)
        res.replace("undefined", " ");
        //message.channel.send("Your answer is " + res)
        // console.log(array[i])
    }
    for (; ;) {
        if (res.indexOf("undefined") != -1) {
            res = res.replace("undefined", " ");
        }
        else {
            break;
        }
    }
    message.channel.send("Your answer is " + res.replace("undefined", " "))
    logger.log('info', `Ccencode command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
}



