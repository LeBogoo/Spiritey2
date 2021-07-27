var client;
module.exports = {
    setup(c) {
        client = c;
    },
    exec() {
        console.log(`Logged in as ${client.user.username}.`)
    }
}