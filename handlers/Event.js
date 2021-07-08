const fs = require("fs");

exports.init = (client) => {
    fs.readdirSync("./events/").forEach((file) => {
        const events = fs.readdirSync("./events/").filter((file) =>
            file.endsWith(".js")
        );

        for (let file of events) {
            if (file.startsWith('#')) return
            let pull = require(`../events/${file}`);

            if (pull.name) {
                client.events.set(pull.name, pull);
            } else {
                continue;
            }
        }
    });
}

exports.conf = {
    disabled: false
}



