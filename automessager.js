const fs = require('fs');
let lastMessage = 0;
module.exports = (channel, client) => {
    let messages = JSON.parse(fs.readFileSync('config.json')).automessages

    client.say(channel, messages[lastMessage])

    lastMessage = (lastMessage == messages.length - 1) ? 0 : lastMessage + 1;
}