const mongoose = require('mongoose')

// Schemas
const History = new mongoose.Schema({
    type: {
        type: String,
        enum: ['water', 'fertilize', 'move'],
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    note: {
        type: String,
        required: false
    }
})

const Plant = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        location: {
            // Location - number built from building/floor/room
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: false,
            default: 'no-image.png'
        },
        notes: {
            // Notes for gardeners
            type: String,
            required: false
        },
        health: {
            water: {
                days_between: {
                    type: Number,
                    min: 1,
                    max: 365,
                    required: true
                },
                amount: {
                    type: Number,
                    // 1: A little, 2: Medium, 3: Plenty
                    min: 1,
                    max: 3,
                    required: true
                },
                due: {
                    type: Date,
                    required: true
                }
            },
            fertilizer: {
                days_between: {
                    type: Number,
                    min: 1,
                    max: 365,
                    required: true
                },
                amount: {
                    type: Number,
                    // 1: A little, 2: Medium, 3: Plenty
                    min: 1,
                    max: 3,
                    required: true
                },
                due: {
                    type: Date,
                    required: true
                }
            },
            light: {
                amount: {
                    type: Number,
                    // 1: Shade, 2: Half-shade, 3: Medium light, 4: Bright, indirect light, 5: Direct sunlight
                    min: 1,
                    max: 5,
                    required: true
                }
            }
        },
        history: [History]
    },
    { timestamps: true }
)

// Export
module.exports = mongoose.model('Plant', Plant)
