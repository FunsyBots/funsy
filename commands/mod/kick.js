const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Wyrzuca podana osobe!',
    aliases: ['wyrzuc'],
    permissions: 'KICK_MEMBERS',
    usage: 'kick <@mention/id> [reason]',
    category: 'mod',
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        const target = await message.guild.member(member);
        if (!target) return functions.usage(message.guild.id, message, `kick <@osoba/id> <powód>`)

        let reason
        if (args[1]) {
            reason = args.slice(1).join(' ')
        } else {
            reason = 'Brak!'
        }

        if (member.id === message.guild.owner.id) return functions.error(message, 'Nie możesz wyrzucić właściciela serwera!')

        if (message.guild.ownerID !== message.author.id && message.member.roles.highest.position <= target.roles.highest.position) return functions.warn(message, `Nie mozesz wyrzucić osoby z wyższą, lub równą Tobie rolą.`);

        if (!target.bannable) return functions.warn(message, `Nie moge wyrzucić tej osoby`)

        try {
            target.ban()
            target.send(new MessageEmbed()
                .setTitle('Zostałeś wyrzucony!!')
                .setDescription(`Zostałeś wyrzucony z serwera ${message.guild.name}`)
                .setAuthor(author, authorAV)
                .setColor('RED')
                .setFooter(footer, footerAV)
                .setTimestamp())
        } catch (error) {
            functions.warn(message, `Użytkownik został wyrzucony, ostarczenie wiadomości o banie nie powiodło sie`)
        }

        functions.sukces(message, `Wyrzuciłem użytkownika ${target} z powodem \`${reason}\``)
    }
}