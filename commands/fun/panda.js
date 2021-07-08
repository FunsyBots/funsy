const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'panda',
    description: 'Wysyła losową pande!',
    category: 'fun',
    run: async (client, message) => {
        const fetch = require('node-fetch');
        const req = await fetch(`https://some-random-api.ml/img/panda`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${client.token}`,
            },
        });
        const res = await req.json();

        functions.image(message, lang.fun.panda, res.link)
    }
}