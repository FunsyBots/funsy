const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'anime',
    description: 'Wysyła losową anime dziefczynke!',
    category: 'fun',
    run: async (client, message) => {
        const fetch = require('node-fetch');
        const req = await fetch(`https://hedge.tk/api/anime-dziefczynki/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${client.token}`,
            },
        });
        const res = await req.json();

        message.lineReplyNoMention(new MessageEmbed()
            .setTitle(lang.fun.anime)
            .setImage(res.anime)
            .setAuthor(author, authorAV)
            .setColor(color)
            .setFooter(footer, footerAV)
            .setTimestamp())
    }
}