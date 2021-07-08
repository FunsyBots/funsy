const { Client, Message, MessageEmbed } = require('discord.js');

const arSchema = require("../../schemas/autorole.js");
const prefixSchema = require('../../schemas/prefix')
const vcSchema = require('../../schemas/vc')
const logsSchema = require('../../schemas/logs')


module.exports = {
    name: 'config',
    description: 'Pokazuje i ustawia konfiguracje serwera',
    aliases: ['conf', 'konfig'],
    permissions: 'ADMINISTRATOR',
    usage: 'config [ustawienie] [wartość]',
    category: 'adm',
    run: async (client, message, args) => {

        const ar = await arSchema.findOne({ guildID: message.guild.id })
        let role;
        if (ar) {
            role = `<@&${ar.role}>`;
        } else {
            role = lang.functions.brak;
        }

        const prefix = message.guild.config.prefix


        // let prefix;
        // let dbPrefix = await prefixSchema.findOne({ guildID: message.guild.id });
        // if (dbPrefix) {
        //     prefix = dbPrefix.prefix;
        // } else {
        //     prefix = client.config.prefix;
        // }

        const vc = await vcSchema.findOne({ guildID: message.guild.id })
        let ch;
        if (vc) {
            ch = `<#${vc.c}>`;
        } else {
            ch = lang.functions.brak;
        }

        const logs = await logsSchema.findOne({ guildID: message.guild.id })
        let logsc;
        if (logs) {
            logsc = `<#${logs.channel}>`;
        } else {
            logsc = lang.functions.brak;
        }

        if (!args[0]) return message.lineReplyNoMention(new MessageEmbed()
            .setTitle(lang.conf.guildconf)
            .setColor(color)
            .setAuthor(author, authorAV)
            .setFooter(footer, footerAV)
            .setTimestamp()
            .setDescription(`${lang.conf.change} \`${message.guild.config.prefix}config <number> <value/reset>\``)
            .addField('`1`: Prefix', `\`${message.guild.config.prefix}\``, true)
            .addField('`2`: Autorole', role, true)
            .addField('`3`: ' + lang.conf.privchannels, ch, true)
            .addField('`4`: ' + lang.conf.messagelogs, logsc, true)
        )

        if (args[0] == '1') {
            const newPrefix = args.slice(1).join(" ");
            if (!newPrefix) {
                functions.usage(message.guild.id, message, "config 1 <prefix>")
                return
            }

            const strLength = newPrefix.length;

            if (strLength > 5) return functions.warn(message, `Prefix nie może byc dłuższy niż 5 znaków!`)

            await prefixSchema.findOneAndUpdate(
                {
                    guildID: message.guild.id,
                },
                {
                    prefix: newPrefix,
                },
                {
                    upsert: true,
                }
            );

            functions.sukces(message, `Pomyślnie ustawiono prefix serwera na \`${newPrefix}\``)
        } else if (args[0] === '2') {
            const newPrefix = args[1];
            if (!newPrefix) {
                functions.usage(message.guild.id, message, `config ${args[0]} <@ranga/id>`)
                return
            }

            if (newPrefix === 'reset') {
                await arSchema.findOneAndDelete({ guildID: message.guild.id });
                functions.sukces(message, `Zresetowano ustawienia autorole!`)
                return
            }

            const r = message.mentions.roles.first() || message.guild.roles.cache.get(newPrefix)
            if (!r) return functions.warn(message, `Podaj prawidłową role! (jeżeli chcesz usunąć autorole wpisz: \`${message.guild.config.prefix}config ${args[0]} reset\`)`)

            await arSchema.findOneAndUpdate(
                {
                    guildID: message.guild.id,
                },
                {
                    role: r.id,
                },
                {
                    upsert: true,
                }
            );

            functions.sukces(message, `Pomyślnie ustawiono autorole na ${r}`)
        } else if (args[0] === '3') {
            const newPrefix = args[1];
            if (!newPrefix) {
                functions.usage(message.guild.id, message, `config ${args[0]} <id kanału głosowego>`)
                return
            }

            if (newPrefix === 'reset') {
                await vcSchema.findOneAndDelete({ guildID: message.guild.id });
                functions.sukces(message, `Zresetowano lobby prywatnych kanałów!!`)
                return
            }

            const r = message.guild.channels.cache.get(args[1])
            if (!r) return functions.warn(message, `Podaj prawidłowy kanał! (jeżeli chcesz usunąć lobby wpisz: \`${message.guild.config.prefix}config ${args[0]} reset\`)`)

            if (r.type !== 'voice') return functions.warn(message, `Lobby musi być kanałem głosowym!! (jeżeli chcesz usunąć lobby wpisz: \`${message.guild.config.prefix}config ${args[0]} reset\`)`)

            await vcSchema.findOneAndUpdate(
                {
                    guildID: message.guild.id,
                },
                {
                    c: r.id,
                },
                {
                    upsert: true,
                }
            );
            functions.sukces(message, `Pomyślnie ustawiono lobby prywatnych kanałów na ${r}`)
        } else if (args[0] === '4') {
            const newPrefix = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            if (!newPrefix) {
                functions.usage(message.guild.id, message, `config ${args[0]} <#kanał/id kanału>`)
                return
            }

            if (newPrefix === 'reset') {
                await logsSchema.findOneAndDelete({ guildID: message.guild.id });
                functions.sukces(message, `Zresetowano kanał logów wiadomości!`)
                return
            }

            if (!newPrefix) return functions.warn(message, `Podaj prawidłowy kanał! (jeżeli chcesz usunąć kanał logów wpisz: \`${message.guild.config.prefix}config ${args[0]} reset\`)`)

            if (newPrefix.type !== 'text') return functions.warn(message, `Kanał logów musi być kanałem tekstowym! (jeżeli chcesz usunąć kanał logów wpisz: \`${message.guild.config.prefix}config ${args[0]} reset\`)`)

            await logsSchema.findOneAndUpdate(
                {
                    guildID: message.guild.id,
                },
                {
                    channel: newPrefix.id,
                },
                {
                    upsert: true,
                }
            );
            functions.sukces(message, `Pomyślnie ustawiono kanał logów na ${newPrefix}`)
        } else if (args[0]) {
            functions.warn(message, `Nie znaleziono takiego ustawienia!`)
        }
    }
}