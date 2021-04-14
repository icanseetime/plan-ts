const mongoose = require('mongoose')

// Schema
const Invite = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['manager', 'gardener'],
            required: true
        },
        invited_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
)

// Export
module.exports = mongoose.model('Invite', Invite)
