// ŁADOWANIE MONGOOSE
const mongoose = require('mongoose');

// TWORZENIE MONGO SCHEMA
const arSchema = new mongoose.Schema({
    guildID: { type: String },
    role: { type: String }
})

// MODULE.EXPORTS
module.exports = mongoose.model('arSchema', arSchema);