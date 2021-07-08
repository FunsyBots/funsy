const chalk = require("chalk");
const fs = require("fs");

module.exports = {
    clear: console.clear,
    test: console.log,
    oWarn: console.warn,
    oErr: console.error,
    assert: console.assert,
    log: (text) => {
        console.test(`[${chalk.green(new Date().toLocaleTimeString())}]: ${text}`);
    },
    warn: (text) => {
        console.oWarn(`[${chalk.yellow(new Date().toLocaleTimeString())}]: ${text}`);
    },
    error: (error) => {
        if (process.env.NODE_ENV === "development") return console.log(error);
        if (!fs.existsSync("./$error.logs.json")) fs.writeFileSync("./$error.logs.json", "[]", "utf8");
        const json = JSON.parse(fs.readFileSync("./$error.logs.json", "utf8"));
        if (!json.length || json[json.length - 1].stack !== error.stack) {
            if (typeof error !== "object") json.push({name: error, date: new Date().toLocaleString()});
            else json.push({
                name: error.name,
                message: error.message,
                stack: error.stack,
                date: new Date().toLocaleString()
            });
            fs.writeFileSync("./$error.logs.json", JSON.stringify(json, null, 2));
            return console.oErr(`[${chalk.red(new Date().toLocaleTimeString())}]: Error jest w plikach.`);
        } else console.oErr(`[${chalk.red(new Date().toLocaleTimeString())}]: Ten sam błąd wystąpił ponownie...`);
    }
}