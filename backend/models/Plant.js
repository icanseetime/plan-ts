const mongoose = require('mongoose')

// Schema
const Plant = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        place: {
            type: Number,
            required: true
        },
        pictures: [],
        notes: {},
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
                    required: true,
                    default: Date.now() + this.health.water.days_between // TODO: fix this
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
                    required: true,
                    default: Date.now() + this.health.fertilizer.days_between // TODO: fix this
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
        }
    }
}, { timestamps: true } )

// Export
module.exports = mongoose.model('Plant', Plant)
