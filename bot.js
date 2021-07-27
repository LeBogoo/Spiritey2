const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

require('./discord-bot')();
require('./twitch-bot')();

// Check for updates on start
async function updateCheck() {
    const answer = (await exec('git pull')).stdout;

    // Exit bot. Systemd will restart automatically.
    if (answer !== 'Already up to date.\n') process.exit();
}

setInterval(updateCheck, 1000 * 10);
updateCheck();