
const gbanSchema = require("../../schemas/gban.js");
module.exports = {
    name: 'ungban',
    description: 'Banuje globalnie użytkownika',
    aliases: ['unglobalban', 'unglobalb'],
    permissions: 'OWNER',
    usage: 'ungban <@osoba/id>',
    category: 'dev',
    run: async (client, message, args) => {
        const arg = args[0]
        if (!arg) return functions.warn(message, 'Może podasz kogo odbanować')
        let user = await client.users.fetch(arg)
        if (!user) return functions.warn(message, 'Nie znaleziono użytkownika!')

        await gbanSchema.findOneAndDelete({ userID: message.author.id });
        functions.sukces(message, 'Użytkownik został globalnie odbanowany!')
    }
}