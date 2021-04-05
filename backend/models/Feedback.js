const mongoose = require('mongoose')

// Schema
const Feedback = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    plant_id: {
        type: Object, //TODO: check type
        required: false
    },
    message_body: {
        type: String,
        required: true
    },
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

// Export
module.exports = mongoose.model('Feedback', Feedback)
