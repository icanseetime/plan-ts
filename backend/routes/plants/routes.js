// Database schemas
const Plant = require('../../models/Plant')

// List plants based on query (no query = all plants)
const listPlants = async (req, res) => {
    try {
        // Find plant (exclude history and notes)
        let plants = await Plant.find(req.query).select('-history -notes')
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
                error: `A plant with this name already exists in the database.`
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

// GET: Get info about specific plant by their ID
const getPlant = async (req, res) => {
    try {
        // Find plant
        const plant = await Plant.findById(req.params.id)
        if (plant) {
            res.status(200).json(plant)
        } else {
            res.status(404).json({ error: 'Plant not found.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while looking for plant with ID ${req.params.id}. [${err}]`
        })
    }
}

// GET: Get notes for specific plant
const plantNotes = async (req, res) => {
    try {
        // Find plant
        const plant = await Plant.findById(req.params.id).select('notes -_id')
        // TODO: return "No notes" if there aren't any notes? Right now it just returns an empty object
        if (plant) {
            res.status(200).json(plant)
        } else {
            res.status(404).json({ error: 'Plant not found.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while looking for notes connected to plant with ID ${req.params.id}. [${err}]`
        })
    }
}

// GET: Get notes for specific plant
const plantHistory = async (req, res) => {
    try {
        // Find plant
        const plant = await Plant.findById(req.params.id).select('history -_id')
        // TODO: return "No history" if there isn't any history? Right now it just returns an empty object
        if (plant) {
            res.status(200).json(plant)
        } else {
            res.status(404).json({ error: 'Plant not found.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while looking for history connected to plant with ID ${req.params.id}. [${err}]`
        })
    }
}

// PUT: Update plant //TODO: Finish building route
const updatePlant = async (req, res) => {
    // Check if plant exists
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body)
    console.log(updatedPlant)
}

// PUT: Water plant
const waterPlant = async (req, res) => {
    try {
        // Check if plant exists
        const existingPlant = await Plant.findById(req.params.id)
        if (existingPlant) {
            const plant = await Plant.findByIdAndUpdate(
                req.params.id,
                {
                    // Update next due date
                    'health.water.due':
                        Date.now() +
                        existingPlant.health.water.days_between * 86400000,
                    // Add new log to history array
                    $push: {
                        history: {
                            type: 'water',
                            user_id: req.body.userID,
                            date: Date.now()
                        }
                    }
                },
                { new: true, rawResult: true }
            )
            res.status(200).json({
                message: 'Succesfully added to history.',
                plant: plant.value
            })
        } else {
            res.status(404).json({ error: 'Plant not found.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to water the plant with ID ${req.params.id}. [${err}]`
        })
    }
}

// PUT: Fertilize plant
const fertilizePlant = async (req, res) => {
    try {
        // Check if plant exists
        const existingPlant = await Plant.findById(req.params.id)
        if (existingPlant) {
            const plant = await Plant.findByIdAndUpdate(
                req.params.id,
                {
                    // Update next due date
                    'health.fertilizer.due':
                        Date.now() +
                        existingPlant.health.fertilizer.days_between * 86400000,
                    // Add new log to history array
                    $push: {
                        history: {
                            type: 'fertilize',
                            user_id: req.body.userID,
                            date: Date.now()
                        }
                    }
                },
                { new: true, rawResult: true }
            )
            res.status(200).json({
                message: 'Succesfully added to history.',
                plant: plant.value
            })
        } else {
            res.status(404).json({ error: 'Plant not found.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to fertilize the plant with ID ${req.params.id}. [${err}]`
        })
    }
}

// PUT: Move plant
const movePlant = async (req, res) => {
    try {
        // Check if plant exists
        const existingPlant = await Plant.findById(req.params.id)
        if (existingPlant) {
            const plant = await Plant.findByIdAndUpdate(
                req.params.id,
                {
                    // Update location
                    location: req.body.location,
                    // Add new log to history array
                    $push: {
                        history: {
                            type: 'move',
                            user_id: req.body.userID,
                            date: Date.now(),
                            note: req.body.note
                        }
                    }
                },
                { new: true, rawResult: true }
            )
            res.status(200).json({
                message: 'Succesfully moved plant and added to history.',
                plant: plant.value
            })
        } else {
            res.status(404).json({ error: 'Plant not found.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to move the plant with ID ${req.params.id}. [${err}]`
        })
    }
}

const deletePlant = async (req, res) => {
    try {
        // Check that plant exists in DB
        let existingPlant = await Plant.findById(req.params.id)
        if (existingPlant) {
            await Plant.findByIdAndDelete(req.params.id)
            res.status(200).json({
                message: `Plant with ID ${req.params.id} deleted successfully.`
            })
        } else {
            res.status(404).json({
                error: 'There is no plant with this ID in the database.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to delete the plant. [${err}]`
        })
    }
}

module.exports = {
    listPlants,
    createPlant,
    getPlant,
    plantNotes,
    plantHistory,
    updatePlant,
    waterPlant,
    fertilizePlant,
    movePlant,
    deletePlant
}
