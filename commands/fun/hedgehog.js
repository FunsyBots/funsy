const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'jez',
    description: 'Wysyła losowego jeża!',
    category: 'fun',
    run: async (client, message) => {
        const fetch = require('node-fetch');
        const req = await fetch(`http://hedge.tk/api/jez/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${client.token}`,
            },
        });
        const res = await req.json();

        message.lineReplyNoMention(new MessageEmbed()
            .setTitle('Wylosowany Jeż!')
            .setImage(res.jez)
            .setAuthor(author, authorAV)
            .setColor(color)
            .setFooter(footer, footerAV)
            .setTimestamp())
    }
}