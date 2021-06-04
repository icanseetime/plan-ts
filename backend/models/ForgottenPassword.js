const mongoose = require('mongoose')

// Schema
const ForgottenPassword = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)

// Export
module.exports = mongoose.model('Forgotten-Password', ForgottenPassword)
