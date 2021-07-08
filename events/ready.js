const client = require('../index')
const mongoose = require('mongoose')

client.on('ready', async () => {
    console.log(`${client.user.tag} gotowy do pracy!`);

    const { mon } = require('../config.json')


    // ŁĄCZENIE Z MONGODB
    await mongoose.connect(mon, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => {
            console.log('Połączono z bazą danych.');
        })
        .catch((err) => {
            console.log(err);
        })

    // PRESENCE
    client.user.setActivity(`@${client.user.username}`, { type: "LISTENING" });
})