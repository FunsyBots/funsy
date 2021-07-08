// ŁADOWANIE MONGOOSE
const mongoose = require('mongoose');

// TWORZENIE MONGO SCHEMA
const gbanSchema = new mongoose.Schema({
    userID: { type: String },
    reason: { type: String }
})

// MODULE.EXPORTS
module.exports = mongoose.model('gbanSchema', gbanSchema);