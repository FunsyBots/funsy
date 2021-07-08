const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Banuje podaną osobe!',
    aliases: ['zbanuj'],
    permissions: 'BAN_MEMBERS',
    usage: 'ban <@mention/id> [reason]',
    category: 'mod',
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        const target = await message.guild.member(member);
        if (!target) return functions.usage(message.guild.id, message, `ban <@osoba/id> <powód>`)

        let reason
        if (args[1]) {
            reason = args.slice(1).join(' ')
        } else {
            reason = 'Brak!'
        }

        if (member.id === message.guild.owner.id) return functions.error(message, 'Nie możesz zbanować właściciela serwera!')

        if (message.guild.ownerID !== message.author.id && message.member.roles.highest.position <= target.roles.highest.position) return functions.warn(message, `Nie mozesz zbanować osoby z wyższą, lub równą Tobie rolą.`);

        if (!target.bannable) return functions.warn(message, `Nie moge zbanować tej osoby`)

        try {
            target.ban()
            target.send(new MessageEmbed()
                .setTitle('Zostałeś zbanowany!!')
                .setDescription(`Zostałeś zbanowany na serwerze ${message.guild.name}`)
                .setAuthor(author, authorAV)
                .setColor('RED')
                .setFooter(footer, footerAV)
                .setTimestamp())
        } catch (error) {

        }

        functions.sukces(message, `Zbanowałem użytkownika ${target} z powodem \`${reason}\``)
    }
}