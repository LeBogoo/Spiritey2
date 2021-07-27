const config = require('../config.json');
const fs = require('fs');
const disrequire = require('disrequire');

var client;
module.exports = {
    setup(c) {
        client = c;
    },
    async exec(msg) {
        const { cleanContent: message, channel } = msg;

        if (message.startsWith(config.prefix)) {
            const args = message.split(" ");
            var cmd = args.shift(1).replace(config.prefix, '').toLowerCase();
            const cmds = JSON.parse(fs.readFileSync('./commands.json'));
            if (cmd in cmds.aliases) cmd = cmds.aliases[cmd];
            if (cmd in cmds.commands) {
                const command = cmds.commands[cmd];
                if (command.discord_script) {
                    let response = await require(`../scripts/${command.discord_script}`)({ msg, cmd, args });
                    if (response) {
                        return channel.send(response);
                    } else {
                        return channel.send("Du kannst diesen Befehl nicht ausführen.");
                    }
                }
            }
            return client.say(channel, "Diese befehl existiert nicht.");
        }
    }
}