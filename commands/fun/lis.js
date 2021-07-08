const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'lis',
    description: 'Wysyła losowego lisa!',
    category: 'fun',
    run: async (client, message) => {
        const fetch = require('node-fetch');
        const req = await fetch(`https://some-random-api.ml/img/fox`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${client.token}`,
            },
        });
        const res = await req.json();

        functions.image(message, 'Wylosowany lis!', res.link)
    }
}