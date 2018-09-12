const winston = require('winston')
var logger = new (winston.Logger)({
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './log.txt' })
  ]
})
exports.run = function (client, message, args, args2, cmd1) {
  var guild = message.guild;
      message.channel.send(':ping_pong: Pinging...').then((msg) => {
        msg.edit(`:ping_pong: Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      });

    // message.channel.send(`Pong! :ping_pong: `)
    // message.channel.send("`" + (client.ping).toFixed(0) + "ms" + "`")
    logger.log('info', `Ping command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
}