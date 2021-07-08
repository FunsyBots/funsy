const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ekipa',
    description: 'Pokazuje ekipe bota!',
    category: 'inf',
    run: async (client, message, args) => {
        const g = client.guilds.cache.get('856235719110033418')
        const roledev = g.roles.cache.get('856235719110033423')
        const support = g.roles.cache.get('856235719110033421')
        const devs = roledev.members.map((member) => (member.user.tag || user.tag)).join('`, `') || lang.functions.brak
        const supporterzy = support.members.map((member) => (member.user.tag || user.tag)).join('`, `') || lang.functions.brak
        message.lineReplyNoMention(
            new MessageEmbed()
                .setAuthor(author, authorAV)
                .setTitle(lang.inf.team)
                .setFooter(footer, footerAV)
                .setTimestamp()
                .setColor(color)
                .addField(lang.inf.devs, '`' + devs + '`')
                .addField(lang.inf.support, '`' + supporterzy + '`')
        )
    }
}