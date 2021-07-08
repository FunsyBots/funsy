// ŁADOWANIE MONGOOSE
const mongoose = require('mongoose');

// TWORZENIE MONGO SCHEMA
const vcSchema = new mongoose.Schema({
    guildID: { type: String },
    c: { type: String }
})

// MODULE.EXPORTS
module.exports = mongoose.model('vcSchema', vcSchema);