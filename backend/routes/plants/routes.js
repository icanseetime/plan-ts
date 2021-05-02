// Database schemas
const Plant = require('../../models/Plant')

// List plants based on query (no query = all plants)
const listPlants = async (req, res) => {
    try {
        // Find plant (exclude history and notes)
        const plants = await Plant.find(req.query)
            .select('-history -notes')
            .populate('location')
            .exec()

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

// Search for plants by name
const searchPlants = async (req, res) => {
    try {
        // Make sure search value is not empty
        if (!req.query.searchField) {
            return res
                .status(400)
                .json({ error: 'Query needs to include a searchField value.' })
        }
        // Search using regex to match part of plant name
        const search = await Plant.find({
            name: {
                $regex: req.query.searchField,
                $options: 'i'
            }
        })
            .select('-history -notes')
            .populate('location')
            .exec()

        if (search.length) {
            res.status(200).json(search)
        } else {
            res.status(404).json({
                error: 'Search did not match any of the plants.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to search for plants. [${err}]`
        })
    }
}

// List plants that are due for watering/fertilizing
// If days are included in query, the route calculates plants due between today and x amount of days ahead
const pastDue = async (req, res) => {
    try {
        let startDate = 0
        if (!req.query.days) {
            // Amount of days should always be 0 if missing
            req.query.days = 0
        } else if (req.query.days != 0) {
            // If query contains days, the start date should be from today
            startDate = Date.now()
        }

        // Find plants that need watering
        const waterDue = await Plant.find(
            {
                'health.water.due': {
                    $gte: startDate,
                    $lte: Date.now() + req.query.days * 86400000
                }
            },
            { name: 1, location: 1, 'health.water.$': 1 }
        )
            .sort({ 'health.water.due': 1 })
            .populate('location')
            .exec()

        // Find plants that need fertilizing
        const fertilizeDue = await Plant.find(
            {
                'health.fertilizer.due': {
                    $gte: startDate,
                    $lte: Date.now() + req.query.days * 86400000
                }
            },
            { name: 1, location: 1, 'health.fertilizer.$': 1 }
        )
            .sort({ 'health.fertilizer.due': 1 })
            .populate('location')
            .exec()

        if (waterDue || fertilizeDue) {
            res.status(200).json({ water: waterDue, fertilize: fertilizeDue })
        } else {
            res.status(404).json({
                error:
                    'Could not find any plants with tasks past due at this time.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find plants. [${err}]`
        })
    }
}

// Get number of tasks/notifications
const noOfNotifications = async (req, res) => {
    try {
        // Coutn plants that need watering
        const waterDue = await Plant.countDocuments({
            'health.water.due': {
                $lte: Date.now()
            }
        })

        // Find plants that need fertilizing
        const fertilizeDue = await Plant.countDocuments({
            'health.fertilizer.due': {
                $lte: Date.now()
            }
        })

        if (waterDue || fertilizeDue) {
            res.status(200).json({
                count: waterDue + fertilizeDue
            })
        } else {
            res.status(404).json({
                error: 'Could not find any tasks due at this time.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find tasks due. [${err}]`
        })
    }
}

// Add new plant
const createPlant = async (req, res) => {
    try {
        // Check that plant name does not exist in DB
        let existingPlant = await Plant.findOne({ name: req.body.name })
        if (existingPlant) {
            return res.status(409).json({
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
            .select('-history -notes')
            .populate('location')
            .exec()
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

// GET: Get history for specific plant
const plantHistory = async (req, res) => {
    try {
        // Find plant
        const plant = await Plant.findById(req.params.id)
            .select('history -_id')
            .populate('history.user_id', 'name')
            .exec()

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

// PUT: Update plant
const updatePlant = async (req, res) => {
    try {
        // Make sure there is no location in the request
        if (req.body.location) {
            return res.status(400).json({
                error:
                    'Request should not include location. Use route for moving plants to update the location.'
            })
        }

        // Make sure history is not updated manually
        if (req.body.history) {
            return res.status(400).json({
                error:
                    'Request should not include history. History array will be updated automatically in other routes.'
            })
        }

        // Update plant
        const plant = await Plant.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                runValidators: true
            }
        )

        // Check for found/updated plant and send response to client
        if (!plant) {
            res.status(404).json({
                error: `Could not find plant with ID ${req.params.id}.`
            })
        } else {
            res.status(201).json({
                message: `Plant with ID ${req.params.id} was successfully updated.`
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to update plant with ID ${req.params.id}. [${err}]`
        })
    }
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
                            user_id: req.body.user_id,
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
                            user_id: req.body.user_id,
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
                            user_id: req.body.user_id,
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
    searchPlants,
    pastDue,
    noOfNotifications,
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
