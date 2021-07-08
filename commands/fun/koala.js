const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'koala',
    description: 'Wysyła losową koale!',
    category: 'fun',
    run: async (client, message) => {
        const fetch = require('node-fetch');
        const req = await fetch(`https://some-random-api.ml/img/koala`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${client.token}`,
            },
        });
        const res = await req.json();

        functions.image(message, lang.fun.koala, res.link)
    }
}