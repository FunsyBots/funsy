const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'linki',
    description: 'Wysyła przydatne linki!',
    category: 'inf',
    run: async (client, message) => {
        message.lineReplyNoMention(new MessageEmbed()
            .setTitle('Przydatne linki!')
            .setDescription(`Support: [Klik!](https://discord.gg/NWGXDHa4K3)\nZaproszenie bota: [Klik!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=${client.config.perms})!`)
            .setColor(color)
            .setAuthor(author, authorAV)
            .setFooter(footer, footerAV)
            .setTimestamp())
    }
}