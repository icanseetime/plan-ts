// Database schemas
const Location = require('../../models/Location')

// POST: Create new location
const createLocation = async (req, res) => {
    try {
        // Create new location
        const newLocation = new Location({
            room: req.body.room,
            floor: req.body.floor,
            building: req.body.building,
            mazemap_link: req.body.mazemap_link,
            mazemap_embed: req.body.mazemap_embed
        })

        // Save location to DB
        const location = await newLocation.save()
        res.status(201).json({
            message: 'New location successfully saved to database.',
            location: location
        })
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to save the location. [${err}]`
        })
    }
}

// GET: List all locations
const listLocations = async (req, res) => {
    try {
        // Find locations
        let locations = await Location.find(req.query)
        if (locations.length) {
            res.status(200).json(locations)
        } else {
            res.status(404).json({ error: 'Could not find any locations.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find locations. [${err}]`
        })
    }
}

// GET: List only buildings
const listBuildings = async (req, res) => {
    try {
        // Find locations
        let locations = await Location.distinct('building')
        if (locations.length) {
            res.status(200).json(locations)
        } else {
            res.status(404).json({ error: 'Could not find any buildings.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find buildings. [${err}]`
        })
    }
}

// GET: Get floors based on building no.
const listFloors = async (req, res) => {
    try {
        // Find distinct floors that match the building
        let locations = await Location.distinct('floor', {
            'building.no': req.params.building
        })
        if (locations.length) {
            res.status(200).json(locations)
        } else {
            res.status(404).json({ error: 'Could not find any floors.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find floors. [${err}]`
        })
    }
}

const listRooms = async (req, res) => {
    try {
        // Find distinct rooms that match the building and floor
        let locations = await Location.find().where({
            'building.no': req.params.building,
            floor: req.params.floor
        })
        if (locations.length) {
            res.status(200).json(locations)
        } else {
            res.status(404).json({ error: 'Could not find any rooms.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find the rooms. [${err}]`
        })
    }
}

const getLocation = async (req, res) => {
    try {
        // Find location
        let location = await Location.findById(req.params.id)
        if (location) {
            res.status(200).json(location)
        } else {
            res.status(404).json({
                error: `Could not find location with ID ${req.params.id}`
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find location with ID ${req.params.id}. [${err}]`
        })
    }
}

module.exports = {
    createLocation,
    listLocations,
    listBuildings,
    listFloors,
    listRooms,
    getLocation
}
