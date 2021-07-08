const client = require("../index");

client.on('guildCreate', async (g) => {
    const channel = client.channels.cache.get("853183149516390401")
    if (channel) {
        const { MessageEmbed } = require("discord.js");
        const embed = new MessageEmbed()
            .setTitle('Dodano bota!')
            .setAuthor(g.name, g.iconURL({ dynamic: true }) || 'https://seeklogo.com/images/D/discord-icon-new-2021-logo-09772BF096-seeklogo.com.png')
            .setColor('#00e8ff')
            .addField("Serwer", `${g.name} | ${g.id}`)
            .addField('Właściciel', `${g.owner.user.tag} | \`${g.owner.id}\``)
            .addField("Ilość osób", `\`${g.memberCount}\``)
            .setFooter('Hedge 2021®', client.user.displayAvatarURL())
            .setTimestamp()
        channel.send(embed);
    }
})

client.on('guildDelete', async (g) => {
    const channel = client.channels.cache.get("853237794292629538")
    if (channel) {
        const { MessageEmbed } = require("discord.js");
        const embed = new MessageEmbed()
            .setTitle('Wyrzucono bota!')
            .setAuthor(g.name, g.iconURL({ dynamic: true }) || 'https://seeklogo.com/images/D/discord-icon-new-2021-logo-09772BF096-seeklogo.com.png')
            .setColor('RED')
            .addField("Serwer", `${g.name} | ${g.id}`)
            .addField('Właściciel', `${g.owner.tag} | \`${g.owner.id}\``)
            .addField("Ilość osób", `\`${g.memberCount}\``)
            .setFooter('Hedge 2021®', client.user.displayAvatarURL())
            .setTimestamp()
        channel.send(embed);
    }
})