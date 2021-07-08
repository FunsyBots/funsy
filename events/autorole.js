const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index')

const arSchema = require('../schemas/autorole')

client.on('guildMemberAdd', async (member) => {
    const ar = await arSchema.findOne({ guildID: member.guild.id })
    if (member.bot) return
    if (!ar) return
    if (ar) {
        let role = member.guild.roles.cache.get(ar.role);
        member.roles.add(role)
    }
})