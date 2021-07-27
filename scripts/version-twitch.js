const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = async (options) => {
    const info = (await exec('git log -1')).stdout.split("\n").filter(e => e !== '');

    var commit = info[0].substr(7, 7); // Get "commit" + 7 chars of hash

    return `Version: ${commit}`;
}