require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');


module.exports = async () => {
    const client = new Discord.Client();

    const events = fs.readdirSync('./discord-events');
    events.forEach(event => {
        const e = require(`./discord-events/${event}`);
        e.setup(client);
        client.on(event.replace('.js', ''), e.exec);
    })

    client.login(process.env.DISCORD_TOKEN)
}