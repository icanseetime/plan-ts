const mongoose = require('mongoose')

// Schema
const Plant = new mongoose.Schema({})

// Export
module.exports = mongoose.model('Plant', Plant)