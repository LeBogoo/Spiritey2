module.exports = async (options) => {
    const { channel, tags, message, self, cmd, args } = options;
    const { username: author } = tags;
    return `Hallo ${author}!!!! BirbRave`;
}