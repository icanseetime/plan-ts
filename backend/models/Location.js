const mongoose = require('mongoose')

// Schema
const Location = new mongoose.Schema({
    building: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    },
    room: {
        type: String,
        required: true
    }
})

// Export
module.exports = mongoose.model('Location', Location)