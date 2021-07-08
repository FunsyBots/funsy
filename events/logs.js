

const client = require('../index')

const { MessageEmbed } = require('discord.js')

const logsSchema = require('../schemas/logs')

client.on('messageDelete', async (msg) => {

    author = msg.author.tag
    authorAV = msg.author.displayAvatarURL({ dynamic: true })
    color = '#00e8ff'
    footer = `Hedge 2021®`
    footerAV = client.user.displayAvatarURL()

    const logs = await logsSchema.findOne({ guildID: msg.guild.id })
    if (!logs) return
    const c = msg.guild.channels.cache.get(logs.channel)

    c.send(
        new MessageEmbed()
            .setTitle('Usunięta wiadomość!')
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setColor(color)
            .setFooter(footer, footerAV)
            .setTimestamp()
            .addField('Treść wiadomości:', `\`${msg.content}\``)
    )
})


client.on('messageUpdate', async (stare, nowe) => {

    author = nowe.author.tag
    authorAV = nowe.author.displayAvatarURL({ dynamic: true })
    color = '#00e8ff'
    footer = `Hedge 2021®`
    footerAV = client.user.displayAvatarURL()

    const logs = await logsSchema.findOne({ guildID: nowe.guild.id })
    if (!logs) return
    const c = nowe.guild.channels.cache.get(logs.channel)

    if (stare.content === nowe.content) return

    c.send(
        new MessageEmbed()
            .setTitle('Wiadomość edytowana!')
            .setAuthor(nowe.author.tag, nowe.author.displayAvatarURL())
            .setColor(color)
            .setFooter(footer, footerAV)
            .setTimestamp()
            .addField('Stara treść:', `\`${stare.content}\``)
            .addField('Nowa treść:', `\`${nowe.content}\``)
    )
})