module.exports = {
    name: 'discordjs',
    description: 'Szuka w dokumentacji biblioteki discord.js!',
    aliases: [`discord.js`, `djs`, `docs`],
    category: 'fun',
    usage: 'discordjs <query>',
    run: async (client, message, args) => {
        let search = args.join(' ')
        if (!search) return functions.usage(message.guild.id, message, 'discordjs <query>')
        const fetch = require('node-fetch')
        fetch(`https://djsdocs.sorta.moe/v1/main/stable/embed?q=${search}`)
            .then(res => res.json())
            .then(body => {
                if (body === null) return functions.error(message, lang.fun.discordjs_error)
                message.channel.send({ embed: body });
            })
    }
}