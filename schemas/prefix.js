// ŁADOWANIE MONGOOSE
const mongoose = require('mongoose');

// TWORZENIE MONGO SCHEMA
const prefixSchema = new mongoose.Schema({
    guildID: { type: String },
    prefix: { type: String }
})

// MODULE.EXPORTS
module.exports = mongoose.model('prefixSchema', prefixSchema);