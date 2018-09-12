const reqEvent = (event) => require (`../events/${event}`)

module.exports = (client)  => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('reconnecting', () => reqEvent('reconnecting')(client));
    client.on('disconnect', () => reqEvent('disconnect')(client));
    // client.on('guildMemberAdd', () => reqEvent('guildMemberAdd')(WelcomeMsg));
    // client.on('guildMemberRemove', () => reqEvent('guildMemberRemove')(WelcomeMsg));
    client.on('message', reqEvent('message'));
    //WelcomeMsg (WelcomeMsg)
};