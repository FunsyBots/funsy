const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    aliases: ["pong", "latency"],
    description: 'Wyświetla ping bota',
    category: 'inf',
    run: async (client, message, args, _args) => {
        message.lineReplyNoMention(new MessageEmbed()
            .setTitle('Ping :ping_pong:')
            .setDescription(`Ping bota: \`${client.ws.ping}ms\``)
            .setAuthor(author, authorAV)
            .setColor(color)
            .setFooter(footer, footerAV)
            .setTimestamp());

    }
};