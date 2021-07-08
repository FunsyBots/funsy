// ŁADOWANIE MONGOOSE
const mongoose = require('mongoose');

// TWORZENIE MONGO SCHEMA
const privVCSchema = new mongoose.Schema({
    userID: { type: String },
    ch: { type: String }
})

// MODULE.EXPORTS
module.exports = mongoose.model('privVCSchema', privVCSchema);