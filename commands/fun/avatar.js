module.exports = {
    name: 'avatar',
    description: 'Pokazuje avatar twój lub kogoś!',
    aliases: ['av'],
    category: 'fun',
    usage: 'avatar [@mention/id]',
    run: async (client, message, args) => {
        const memberav = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author

        functions.image(message, lang.fun.avatar, memberav.displayAvatarURL({ dynamic: true }))
    }
}