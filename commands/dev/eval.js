const {
    MessageEmbed
} = require("discord.js");
const {
    inspect
} = require("util");

module.exports = {
    name: "eval",
    aliases: ["e", "adm.eval", "dev.eval", "evaluate"],
    description: 'Ewaluuje kod',
    permissions: 'OWNER',
    category: 'dev',
    run: async (client, message, args) => {
        const code = args.join(" ") || null;

        //if (message.content.includes('token')) return message.lineReplyNoMention("ByczQ, token nie dla psa ;)");

        try {
            evaled = eval(code);
        } catch (err) {
            return message.lineReplyNoMention(new MessageEmbed()
                .setColor(color)
                .setTitle("❌ Błąd!")
                .setDescription(`Wejście:\`\`\`js\n${code}\n\`\`\`\n Wyjście:\`\`\`js\n${err.stack}\n\`\`\``)
                .setAuthor(author, authorAV)
                .setFooter(footer, footerAV)
                .setTimestamp()
            );
        }
        const inspected = inspect(evaled, {
            depth: 0
        })

        return message.lineReplyNoMention(new MessageEmbed()
            .setColor(color)
            .setTitle("✅ Sukces!")
            .setDescription(`Wejśce:\`\`\`js\n${code} \n\`\`\`\n Wyjście:\`\`\`js\n${inspected} \n\`\`\`\n Typ:\`\`\`yaml\n${typeof evaled}\`\`\``)
            .setAuthor(author, authorAV)
            .setFooter(footer, footerAV)
            .setTimestamp()
        )
    }
};