// const client = require('../index')
// const BlacklistedWords = require('../Collection/index')
// client.on('message', async (message) => {
//     if (!message.guild || message.author.id === client.user.id) return

//     const splittedMsgs = message.content.split(' ')

//     let deleting = false

//     await Promise.all(
//         splittedMsgs.map((content) => {
//             if (BlacklistedWords.get(message.guild.id)?.includes(content.toLowerCase())) deleting = true
//         })
//     )
//     if (deleting) return message.delete()
// })