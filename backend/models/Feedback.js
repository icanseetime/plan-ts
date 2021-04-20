const mongoose = require('mongoose')

// Schema
const Feedback = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        plant_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
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
