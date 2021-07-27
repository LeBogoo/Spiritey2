const Discord = require('discord.js');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = async (options) => {
    const { msg, cmd, args } = options;

    const info = (await exec('git log -1')).stdout.split("\n").filter(e => e !== '');
    const versionEmbed = new Discord.MessageEmbed();

    var commit = info[0].substr(0, 14); // Get "commit" + 7 chars of hash
    commit = commit.charAt(0).toUpperCase() + commit.slice(1); // Capitalize first char

    versionEmbed.setTitle(commit);

    var commitURL = (await exec('git remote get-url origin')).stdout.trim().replace(".git", '') + `/commit/${info[0].substr(7)}`;
    versionEmbed.setURL(commitURL);

    var author = info[1].replace('Author: ', '').split(' <')[0];
    versionEmbed.addField('Author:', author)

    var date = (new Date(info[2].replace('Date: ', '')).getTime()) / 1000;

    versionEmbed.addField('Date:', `<t:${date}>`);

    versionEmbed.addField('Message:', info[3].trim());

    return versionEmbed;
}