
const client = require('../index')
const { MessageEmbed, WebhookClient } = require("discord.js");

client.on('message', async message => {

    message.author.displayName = message.member.nickname;
    if (!message.author.displayName || message.author.displayName == null) message.author.displayName = message.author.username;

    // Zmienne

    author = message.author.displayName
    authorAV = message.author.displayAvatarURL({ dynamic: true })
    color = '#00e8ff'
    footer = `Hedge 2021®`
    footerAV = client.user.displayAvatarURL()
    Embed = MessageEmbed
    if (message.author.bot) return


    // Ładowanie schematów

    const gbanSchema = require('../schemas/gban')
    const langSchema = require('../schemas/lang')
    const prefixSchema = require('../schemas/prefix')


    // Dm i permy

    if (message.channel.type === 'dm') return;
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;

    let prefix;
    let dbPrefix = await prefixSchema.findOne({ guildID: message.guild.id });
    if (dbPrefix) {
        prefix = dbPrefix.prefix;
    } else {
        prefix = client.config.prefix;
    }

    let language;
    let dbLang = await langSchema.findOne({ guildID: message.guild.id });
    if (dbLang) {
        language = dbLang.lang;
    } else {
        language = 'pl';
    }



    message.guild.config = {
        prefix: prefix,
        lang: language
    }

    lang = require(`../languages/${language}.json`)

    const prefixCheck = new RegExp(`^<@!?${client.user.id}>( |)$`, "g");
    if (message.content.match(prefixCheck)) message.lineReplyNoMention(new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({
            dynamic: true
        }))
        .setDescription(`> ${lang.inf.m1}`)
        .addField(lang.inf.mp, `${lang.inf.mpis} \`${prefix}\` ${lang.inf.mpchan} \`${prefix}config\``) // Możesz go zmienić pod komendą \`${prefix}prefix\`!
        .addField(lang.inf.mclist, `${lang.inf.mhelp} \`${prefix}help\``)
        .setColor(color)
        .setFooter(footer, footerAV)
        .setTimestamp()
    );


    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/g);
    const cmd = args.shift();
    if (!cmd.length) return;

    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return message.react('849370711272587326');

    if (command) {

        // Sprawdzanie gbanicji

        let gban = await gbanSchema.findOne({ userID: message.author.id });
        if (gban) return message.lineReplyNoMention(new MessageEmbed()
            .setTitle('Masz GBana!')
            .addField('Co to jest?', 'GBan to globalna blokada dzięki której nie możesz używać żadnych komend bota!')
            .addField('Powód:', gban.reason)
            .setColor('RED')
            .setAuthor(author, authorAV)
            .setTimestamp()
            .setFooter(footer, footerAV))



        // Permisje

        if (command.permissions) {
            if (command.permissions == 'OWNER') {
                if (!client.config.developers.includes(message.author.id)) return message.lineReplyNoMention(new MessageEmbed()
                    .setTitle('Brak permisji!')
                    .setDescription('By wykonać tą komende musisz być developerem bota!')
                    .setColor('RED')
                    .setAuthor(author, authorAV)
                    .setFooter(footer, footerAV))
            } else {
                const authorPerms = message.channel.permissionsFor(message.author);
                if (!authorPerms || !authorPerms.has(command.permissions)) {
                    return message.lineReplyNoMention(new MessageEmbed()
                        .setTitle('Brak permisji!')
                        .setDescription(`By użyć tej komendy potrzebujesz permisji \`${command.permissions}\`!`)
                        .setAuthor(author, authorAV)
                        .setFooter(footer, footerAV)
                        .setColor('RED'))
                }
            }
        }


        // Wykonywanie komendy oraz wysyłanie erroru do naszego kochanego webhooka :PikaLove:

        command.run(client, message, args).catch(async (err) => {
            new WebhookClient(process.env.WEBHOOKS_ERROR.split("/")[5], process.env.WEBHOOKS_ERROR.split("/")[6])?.send(new MessageEmbed()
                .setAuthor(message.author.tag + ' (' + message.author.id + ')' + `\n${message.guild.name} (${message.guild.id})`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription("```js\n" + err.stack + "```")
                .addField('Błąd wywołała komenda:', `\`${command.name}\``)
                .setColor("RED")
                .setFooter(footer, footerAV)
                .setTimestamp()
            );
            functions.error(message, lang.inf.errorincmd)
        });
    }
});