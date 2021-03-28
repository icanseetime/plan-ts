const mongoose = require('mongoose')

// Schema
const Invite = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    invited_by: {
        type: Object //TODO: check if this is correct type of _id
    },
    timestamps: true
})

// Export
module.exports = mongoose.model('Invite', Invite)