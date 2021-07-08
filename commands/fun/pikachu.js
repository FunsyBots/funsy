const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'pikachu',
    description: 'Wysyła losowego pikachu!',
    category: 'fun',
    run: async (client, message) => {
        const fetch = require('node-fetch');
        const req = await fetch(`https://some-random-api.ml/img/pikachu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${client.token}`,
            },
        });
        const res = await req.json();

        functions.image(message, lang.fun.pikachu, res.link)
    }
}