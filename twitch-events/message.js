const config = require('../config.json');
const fs = require('fs');
const disrequire = require('disrequire');

var client;
module.exports = {
    setup(c) {
        client = c;
    },
    async exec(channel, tags, message, self) {
        if (self) return;
        client.lastMessageTime = new Date().getTime();

        if (message.startsWith(config.prefix)) {
            const args = message.split(" ");
            var cmd = args.shift(1).replace(config.prefix, '').toLowerCase();
            const cmds = JSON.parse(fs.readFileSync('./commands.json'));
            if (cmd in cmds.aliases) cmd = cmds.aliases[cmd];
            if (cmd in cmds.commands) {
                const command = cmds.commands[cmd];
                if (command.twitch_script) {
                    let response = await require(`../scripts/${command.twitch_script}`)({ channel, tags, message, self, cmd, args });

                    if (response) {

                        return client.say(channel, response);
                    } else {
                        return client.say(channel, "Du kannst diesen Befehl nicht ausführen.");
                    }
                }
            }
            return client.say(channel, "Diese befehl existiert nicht.");
        }
    }
}