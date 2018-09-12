// var google = require('google')
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {

    // const cheerio = require('cheerio');
    // const snekfetch = require('snekfetch');
    // const querystring = require('querystring');
    const superagent = require('superagent');
    const cheerio = require('cheerio');
    const url = require('url');
    const Discord = require('discord.js');
    const config = require("../config.json");
    var guild = message.guild;
    const embed11 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}google`)
        .addField("**Usage:**", `${config.prefix}google <query>`)
        .addField("**Example:**", `${config.prefix}google stuff`)
        .addField("**Expected Result From Example:**", "Should return first 3 results of the query on Google")
    if (args.join(' ') == "") return message.channel.send({ embed: embed11 })
    let result;
    let Url = `https://www.googleapis.com/customsearch/v1?key=${config.yt}&cx=${config.Gcx}&q=${args.join(' ')}&safe=medium`;
    superagent.get(Url)
    .end((err,res) => {
        result = res.body;
        // console.log(result)
        const embed1 = new Discord.RichEmbed()
        .setColor("#00B0E7")
        .setTitle(`Google Search Result for ${args.join(' ')}`)
        .setDescription(`Results are displayed in <Title of Result> - <Descriptions (If Avaliable)> \n**Link:** <link to page>`)
        .addField(`1st Result`,`${result.items[0].title} - ${result.items[0].snippet}\n**Link:** ${result.items[0].link}`)
        .addField(`2nd Result`,`${result.items[1].title} - ${result.items[1].snippet}\n**Link:** ${result.items[1].link}` )
        .addField(`3rd Result`,`${result.items[2].title} - ${result.items[2].snippet}\n**Link:** ${result.items[2].link}` )
        .setFooter(`Link to Search: https://www.google.com/search?q=${args.join(' ')}`)
        message.channel.send({embed: embed1})
    })
    logger.log('info', `Google command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)

};