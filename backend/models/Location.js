const mongoose = require('mongoose')

// Schemas
const Room = new mongoose.Schema({
    no: {
        type: Number,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
})

const Floor = new mongoose.Schema({
    no: {
        type: Number,
        required: true
    },
    rooms: [Room]
})

const Location = new mongoose.Schema({
    building: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    floors: [Floor]
})

// Export
module.exports = mongoose.model('Location', Location)
