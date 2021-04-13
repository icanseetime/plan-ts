// Database schemas
const Plant = require('../../models/Plant')

// List plants based on query (no query = all plants)
const listPlants = async (req, res) => {
    try {
        let plants = await Plant.find(req.query)
        if (plants.length) {
            res.status(200).json(plants)
        } else {
            res.status(404).json({ error: 'Could not find any plants.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find plants. [${err}]`
        })
    }
}

// Add new plant
const createPlant = async (req, res) => {
    try {
        // Check that plant name does not exist in DB
        let existingPlant = await Plant.findOne({ name: req.body.name })
        if (existingPlant) {
            res.status(409).json({
                error: `A plant with this name already exists in the database.` // TODO: check security
            })
        }

        // Create plant object
        const newPlant = new Plant({
            name: req.body.name,
            location: req.body.location,
            picture: req.body.picture,
            notes: req.body.notes,
            health: {
                water: {
                    days_between: req.body.waterDaysBetween,
                    amount: req.body.waterAmount,
                    due: req.body.waterDue
                },
                fertilizer: {
                    days_between: req.body.fertilizerDaysBetween,
                    amount: req.body.fertilizerAmount,
                    due: req.body.fertilizerDue
                },
                light: {
                    amount: req.body.lightAmount
                }
            }
        })

        // Save to DB & send response to client-side
        const plant = await newPlant.save()
        res.status(201).json({
            message: 'New plant successfully created.',
            plant: plant
        })
    } catch (err) {
        res.status(500).json({
            error: `There was an error adding ${req.body.name} to the database. [${err}]`
        })
    }
}

module.exports = {
    listPlants,
    createPlant
}
