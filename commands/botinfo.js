function timeCon(time) {
    time = time * 1000
    let days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0
    days = Math.floor(time / 86400000)
    time -= days * 86400000
    hours = Math.floor(time / 3600000)
    time -= hours * 3600000
    minutes = Math.floor(time / 60000)
    time -= minutes * 60000
    seconds = Math.floor(time / 1000)
    time -= seconds * 1000
    days = days > 9 ? days : "" + days
    hours = hours > 9 ? hours : "" + hours
    minutes = minutes > 9 ? minutes : "" + minutes
    seconds = seconds > 9 ? seconds : "" + seconds
    return (parseInt(days) > 0 ? days + " days " : " ") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + " hours ") + minutes + " minutes " + seconds + " seconds."
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
    const pkg = require("../package.json");
    const os = require("os")
    var guild = message.guild;
    let totalPeople = 0;
    let botNumber = 0;
    client.guilds.map(person => totalPeople += person.memberCount)
    client.guilds.map(botPerson => botNumber += botPerson.members.filter(member => member.user.bot).size)
    const embed = new Discord.RichEmbed()
        .setColor('#7d5bbe')
        .setTitle(client.user.username + " V: " + pkg.version + ` Stats`)
        .setDescription(client.user.username + ' has been awake for ' + timeCon(process.uptime()))
        .addField('🏠 Guilds', client.guilds.size, true)
        .addField('📄 Channels', client.channels.size, true)
        .addField('🤵 Total Users',(totalPeople - botNumber), true) //repl with -test cmd contents
        // .addField('💾 Last Commit', jsonBody[0].commit.message, true)
        .addField('🐏 RAM Usage', `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`, true)
        .addField('🏓 Ping', `${(client.ping).toFixed(0)} ms`, true)
        .addField(`:control_knobs: Library`, `Discord JS v${Discord.version}`, true)
        .addField(`:computer: Node `, `${process.version}`, true)
        .addField(`:regional_indicator_h: :regional_indicator_o: :regional_indicator_s: :regional_indicator_t: Host Name`, `${os.hostname}`, true)
        .addField(`:white_check_mark: Platform`, `${os.platform}`, true)
        .addField(`:construction_worker: Creator`, `AirFusion#1243`, true)
    //    .addField(`:electric_plug: CPU Usage:`,);
    message.channel.send({ embed: embed })
    logger.log('info', `Botinfo command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
};
