const mongoose = require('mongoose')

// Schemas
const Location = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    building: {
        name: {
            type: String,
            required: true
        },
        no: {
            type: Number,
            required: true
        }
    },
    mazemap_link: {
        type: String,
        required: true
    },
    mazemap_embed: {
        type: String,
        required: true
    }
})

// Export
module.exports = mongoose.model('Location', Location)
