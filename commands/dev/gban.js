
const { MessageAttachment } = require("discord.js");
const gbanSchema = require("../../schemas/gban.js");
module.exports = {
    name: 'gban',
    description: 'Banuje globalnie użytkownika',
    aliases: ['globalban', 'globalb'],
    permissions: 'OWNER',
    usage: 'gban <@osoba/id>',
    category: 'dev',
    run: async (client, message, args) => {
        const arg = args[0]
        const reason = args.slice(1).join(' ')
        if (!arg || !reason) return functions.warn(message, 'Może podasz kogo zgbanować i tego powód?')
        let user = await message.mentions.users.first || client.users.fetch(arg)
        if (!user) return functions.warn(message, 'Nie znaleziono użytkownika!')

        let check = await gbanSchema.findOne({ userID: message.author.id });
        if (!check) {
            await gbanSchema.findOneAndUpdate(
                {
                    userID: arg,
                },
                {
                    reason: reason,
                },
                {
                    upsert: true,
                }
            );
            functions.sukces(message, 'Użytkownik został globalnie zbanowany!')
        } else {
            functions.warn(message, `Ten użytkownik już posiada GBana!`)
        }
    }
}