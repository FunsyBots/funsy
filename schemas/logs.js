// ŁADOWANIE MONGOOSE
const mongoose = require('mongoose');

// TWORZENIE MONGO SCHEMA
const logsSchema = new mongoose.Schema({
    guildID: { type: String },
    channel: { type: String }
})

// MODULE.EXPORTS
module.exports = mongoose.model('logsSchema', logsSchema);