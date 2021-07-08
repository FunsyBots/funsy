const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['pomoc', 'h'],
    category: 'inf',
    description: 'Pokazuje liste komend',
    usage: 'help [komenda]',
    run: async (client, message, args) => {
        if (!args[0]) {
            const dev = message.client.commands.filter(x => x.category == 'dev').map((x) => '`' + x.name + '`').join(', ');
            const adm = message.client.commands.filter(x => x.category == 'adm').map((x) => '`' + x.name + '`').join(', ');
            const conf = message.client.commands.filter(x => x.category == 'conf').map((x) => '`' + x.name + '`').join(', ');
            const informacyjne = message.client.commands.filter(x => x.category == 'inf').map((x) => '`' + x.name + '`').join(', ');
            const mod = message.client.commands.filter(x => x.category == 'mod').map((x) => '`' + x.name + '`').join(', ');
            const fun = message.client.commands.filter(x => x.category == 'fun').map((x) => '`' + x.name + '`').join(', ');


            const e = new MessageEmbed()
                .setTitle(lang.inf.cmdlist)
                .setAuthor(author, authorAV)
                .setColor(color)
                .setFooter(footer, footerAV)
                .setTimestamp()


            if (client.config.developers.includes(message.author.id)) {
                e.addField(lang.inf.dev, dev)
            }


            e.addFields(
                //{ name: 'Deweloperskie:', value: dev },
                { name: lang.inf.inf, value: informacyjne },
                //{ name: 'Administracyjne:', value: adm },
                //{ name: lang.inf.conf, value: conf },
                { name: lang.inf.mod, value: mod },
                { name: lang.inf.fun, value: fun },
            )

            message.lineReplyNoMention(e)

        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.lineReplyNoMention(new MessageEmbed()
                .setAuthor(author, authorAV)
                .setTitle(lang.inf.cmdnotfound)
                .setDescription(`${lang.inf.notfoundtx} \`${message.guild.config.prefix}help\`!`)
                .setColor(color)
                .setFooter(footer, footerAV)
                .setTimestamp())

            message.lineReplyNoMention(
                new MessageEmbed()
                    .setTitle(lang.inf.cmdinfo)
                    .addField(lang.inf.cmdname, command.name ? `\`${command.name}\`` : 'Brak nazwy komendy!', true)
                    .addField(lang.inf.aliases, command.aliases ? `\`${command.aliases.join('`, `')}\`` : lang.inf.nonaliases, true)
                    .addField(lang.inf.usage, command.usage ? `\`${message.guild.config.prefix}${command.usage}\`` : `\`${message.guild.config.prefix}${command.name}\``, true)
                    .addField(lang.inf.description, command.description ? `${command.description}` : lang.inf.nondescription, true)
                    .setAuthor(author, authorAV)
                    .setColor(color)
                    .setTimestamp()
                    .setFooter(footer, footerAV)
            );
        };
    },
};