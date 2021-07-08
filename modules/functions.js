const client = require('../index.js')
const langSchema = require('../schemas/lang')


// async () => {
//     let language;
//     let dbLang = await langSchema.findOne({ guildID: message.guild.id });
//     if (dbLang) {
//         language = dbLang.lang;
//     } else {
//         language = 'pl';
//     }
//     lang = require(`../languages/${language}.json`)
// }


functions = {

    // FUNKCJA USAGE EMBED

    usage: async function (server, message, usage) {
        const prefixSchema = require("../schemas/prefix.js");
        let prefix;
        let dbPrefix = await prefixSchema.findOne({ guildID: message.guild.id });
        if (dbPrefix) {
            prefix = dbPrefix.prefix;
        } else {
            prefix = client.config.prefix;
        }
        const { MessageEmbed } = require("discord.js")
        message.lineReplyNoMention(new MessageEmbed()
            .setTitle(lang.functions.usage)
            .setDescription(`${lang.functions.usage1}: \`${prefix}${usage}\``)
            .setColor(color)
            .setAuthor(author, authorAV)
            .setFooter(footer, footerAV)
            .setTimestamp())
    },

    // FUNKCJA SUKCES EMBED

    sukces: async function (message, suc) {
        const { MessageEmbed } = require("discord.js")
        message.lineReplyNoMention(new MessageEmbed()
            .setTitle(lang.functions.sukces)
            .setDescription(suc)
            .setAuthor(author, authorAV)
            .setColor(color)
            .setFooter(footer, footerAV)
            .setTimestamp())
    },

    // FUNKCJA ERROR EMBED

    error: async function (message, suc) {
        const { MessageEmbed } = require("discord.js")
        message.lineReplyNoMention(new MessageEmbed()
            .setTitle(lang.functions.error)
            .setDescription(suc)
            .setAuthor(author, authorAV)
            .setColor('RED')
            .setFooter(footer, footerAV)
            .setTimestamp())
    },

    // FUNKCJA WARN EMBED

    warn: async function (message, suc) {
        const { MessageEmbed } = require("discord.js")
        message.lineReplyNoMention(new MessageEmbed()
            .setTitle(lang.functions.warn)
            .setDescription(suc)
            .setAuthor(author, authorAV)
            .setColor('ORANGE')
            .setFooter(footer, footerAV)
            .setTimestamp())
    },

    // FUNKCJA IMAGE EMBEDA

    image: async function (message, title, img) {
        const { MessageEmbed } = require("discord.js")
        message.lineReplyNoMention(new MessageEmbed()
            .setTitle(title)
            .setAuthor(author, authorAV)
            .setColor(color)
            .setFooter(footer, footerAV)
            .setTimestamp()
            .setImage(img))
    }
}

module.exports = functions