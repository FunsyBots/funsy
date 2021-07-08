const client = require('../index')

const vcSchema = require('../schemas/vc')
const privVCSchema = require('../schemas/privVC')

client.on("voiceStateUpdate", async (stare, nowe) => {
    const vc = await vcSchema.findOne({ guildID: nowe.guild.id })
    if (!vc) return

    const user = await client.users.fetch(nowe.id)
    const member = nowe.guild.member(user)

    if (!stare.channel && nowe.channel.id === vc.c) {
        const channel = await nowe.guild.channels.create(user.tag, {
            type: "voice",
            parent: nowe.channel.parent
        })
        member.voice.setChannel(channel)
        await privVCSchema.findOneAndUpdate(
            {
                userID: user.id,
            },
            {
                ch: channel.id,
            },
            {
                upsert: true,
            }
        );
    } else if (!nowe.channel) {
        const chann = await privVCSchema.findOne({ userID: user.id })
        if (stare.channel.id === chann.ch) return stare.channel.delete()
    }
})