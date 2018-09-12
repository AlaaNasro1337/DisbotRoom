function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
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
    var userInput = args.join(' ').toLowerCase();
    const embed19 = new Discord.RichEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}rps`)
        .addField("**Usage:**", `${config.prefix}rps <your choice>`)
        .addField("**Example:**", `${config.prefix}rps rock`)
        .addField("**Expected Result From Example:**", "Should return if you won or lost, and the computer's choice.")
    if (args.join(' ') == "" && args2.join(" ") == "") return message.channel.send({ embed: embed19 })
    var computerchoose = getRandomIntInclusive(1, 3) //rock paper sissor
    var computerfinal = '';
    if (computerchoose === 1) {
        computerfinal = "rock";
    }
    else if (computerchoose === 2) {
        computerfinal = "paper";
    }
    else if (computerchoose === 3) {
        computerfinal = "scissor";
    }
    if ( (userInput === 'rock' && computerfinal === "rock") || (userInput === 'rocks' && computerfinal === "rock") ) {
        message.channel.send("Tie! :>" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if ((userInput === 'rock' && computerfinal === "paper") || (userInput === 'rocks' && computerfinal === "paper"))  {
        message.channel.send("I win! :)" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if ((userInput === 'rock' && computerfinal === "scissor") || (userInput === "rocks" && computerfinal === "scissor")) {
        message.channel.send("You win :(" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if ( (userInput === 'paper' && computerfinal === "rock") || (userInput === 'papers' && computerfinal === "rock")) {
        message.channel.send("You win :(" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if ( (userInput === 'paper' && computerfinal === "paper") || (userInput === "papers" && computerfinal === "paper") ) {
        message.channel.send("Tie! :>" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if ( (userInput === 'paper' && computerfinal === "scissor") || (userInput === "papers" && computerfinal === 'scissor') ) {
        message.channel.send("I win! :)" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if ( (userInput === 'scissor' && computerfinal === 'rock') || (userInput === "scissors" && computerfinal === "rock") ) {
        message.channel.send("I win! :)" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if ( (userInput === 'scissor' && computerfinal === 'paper') || (userInput === "scissors" && computerfinal === "paper") ) {
        message.channel.send("You win :(" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if ( (userInput === 'scissor' && computerfinal === 'scissor') || (userInput === "scissors" && computerfinal === "scissor")) {
        message.channel.send("Tie! :>" + `You chose: ${userInput}. I chose: ${computerfinal}.`)
    }
    else if (userInput != 'scissor' || userInput != 'scissors' || userInput != 'rock' || userInput != 'rocks' || userInput != 'paper' || userInput != 'papers') {
        message.reply(':x: Please enter a valid object - Rock, Paper OR Scissor');
    }
    else {
        message.channel.send(":x: Failed to Execute the command.")
    }
    logger.log('info', `Rps command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)    
    
}