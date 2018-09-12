const chalk = require('chalk');
const config = require("../config.json");
module.exports = client => {
    console.log(chalk.bold("You have been disconnected @ " + Date()));
}