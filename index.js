const { Client, Collection } = require("discord.js");
require("discord-reply")
const client = new Client({ ws: { properties: { $browser: "Discord iOS" } } }, { disableMentions: 'everyone', shards: "auto" }, { partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'] });
const fs = require("fs");
new (require("./modules/dotenv"))();

module.exports = client;

const functions = require("./modules/functions.js");

console = require("./modules/logger");

client.config = require("./config.json");
client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();

for (const i of fs.readdirSync("./handlers")) {
    if (!require("./handlers/" + i).conf.disabled) require("./handlers/" + i).init(client);
}

client.login(ODYxNjU5Mzg0OTc4NzM1MTI0.YONA1g.lFY1raxNj3Dwc6UfdOQJLhweOs4).then(() => console.log("Próba logowania.."));
