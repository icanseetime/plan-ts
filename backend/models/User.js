const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Schema
const User = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String,
                required: true
            }
        },
        role: {
            type: String,
            enum: ['manager', 'gardener'],
            required: true
        }
    },
    { timestamps: true }
)

// Middleware
User.pre('save', async function () {
    // Encrypt password before saving to DB
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

User.pre('findOneAndUpdate', async function () {
    // Encrypt password before saving to DB (if it exists in update request)
    if (this._update.password) {
        const salt = await bcrypt.genSalt()
        this._update.password = await bcrypt.hash(this._update.password, salt)
    }
})

// Instance methods
User.methods.validPassword = async (password, userPass) => {
    // Validate password from DB against given password
    return await bcrypt.compare(password, userPass)
}

// Export
module.exports = mongoose.model('User', User)
