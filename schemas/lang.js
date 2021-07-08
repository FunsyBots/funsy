// ŁADOWANIE MONGOOSE
const mongoose = require('mongoose');

// TWORZENIE MONGO SCHEMA
const langSchema = new mongoose.Schema({
    guildID: { type: String },
    lang: { type: String }
})

// MODULE.EXPORTS
module.exports = mongoose.model('langSchema', langSchema);