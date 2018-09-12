const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
 exports.run = function (client, message, args, args2, cmd, config) {
   const Discord = require('discord.js');
   var guild = message.guild;
    const embed = new Discord.RichEmbed()
      .setColor("#006b3c")    //#357cee
      .setTitle("Color Hex")
      .setDescription("Website for Color Codes!\n")
      //.setURL("http://bit.ly/colorhexcolor")
      .addField("Bit.ly Link:", `Please visit: [Here](http://bit.ly/colorhexcolor)`)
      .addField("Normal Link:", "If the link above does not work, then visit this link: [Here](http://www.colorhexa.com/color-names)")
   // message.channel.sendEmbed(embed)
    message.channel.send({embed: embed});
    logger.log('info', `Color command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
 };
