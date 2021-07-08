const fs = require("fs");

exports.init = (client) => {
    fs.readdirSync("./commands").forEach((category) => {
        const commands = fs.readdirSync("./commands/" + category);
        for (const commandFile of commands) {
            if (commandFile.startsWith("#")) return;
            if (!commandFile.endsWith(".js")) return console.error(`${commandFile} - zły plik dodaj końcówke ".js"`);

            const cmd = require("../commands/" + category + "/" + commandFile);
            if (!cmd.name) return console.error("Problem z załadowaniem " + commandFile + ", nie dodałeś argumentu `name`!");

            client.commands.set(cmd.name, cmd);
            if (cmd.aliases && cmd.aliases.length > 0 && Array.isArray(cmd.aliases)) cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
        }
    });
}

exports.conf = {
    disabled: false
}
