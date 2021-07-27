require('dotenv').config();
const config = require('./config.json')
const tmi = require('tmi.js');
const fs = require('fs');
const automessager = require('./automessager');


module.exports = async () => {

    const client = new tmi.Client({
        options: { debug: true, messagesLogLevel: "info" },
        connection: {
            reconnect: true,
            secure: true
        },
        identity: {
            username: process.env.TWITCH_USERNAME,
            password: process.env.TWITCH_TOKEN
        },
        channels: [config.twitch_channel]
    });
    client.lastMessageTime = 0;
    client.connect().catch(console.error);

    const events = fs.readdirSync('./twitch-events');
    events.forEach(event => {
        const e = require(`./twitch-events/${event}`);
        e.setup(client);
        client.on(event.replace('.js', ''), e.exec);
    })

    function TriggerAutoMessager() {
        const diff = new Date().getTime() - client.lastMessageTime;
        if (diff < 100 * 60 * 5) automessager(config.twitch_channel, client);
    }

    setInterval(TriggerAutoMessager, 1000 * 60 * 10);
}
