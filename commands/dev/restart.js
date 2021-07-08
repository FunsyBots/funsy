const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Restartuje bota',
    aliases: ['reboot'],
    permissions: 'ONWER',
    category: 'dev',
    run: async (client, message, args) => {
        message.react('849934290670321694')
        process.exit(0)
    }
}