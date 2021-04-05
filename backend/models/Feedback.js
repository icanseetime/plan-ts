const mongoose = require('mongoose')

// Schema
const Feedback = new mongoose.Schema(
    {
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
        }
    },
    { timestamps: true }
)

// Export
module.exports = mongoose.model('Feedback', Feedback)
