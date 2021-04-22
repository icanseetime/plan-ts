// Database schemas
const Location = require('../../models/Location')

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

// GET: List only building names and numbers
const listBuildings = async (req, res) => {
    try {
        // Find locations
        let locations = await Location.find(req.query).select('building name')
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

// GET: Get building based on the building number
const getBuilding = async (req, res) => {
    try {
        // Find location
        let location = await Location.findOne({ building: req.params.no })
        if (location) {
            res.status(200).json(location)
        } else {
            res.status(404).json({ error: `Building not found.` })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while looking for building with no. ${req.params.no}. [${err}]`
        })
    }
}

// GET: Get location based on location string (used in plant objects)
const getLocation = async (req, res) => {
    try {
        // Find location and filter out other floors
        let location = await Location.findOne(
            {
                'floors.rooms.uid': req.params.uid
            },
            {
                name: 1,
                'floors.no': 1,
                'floors.rooms.$': 1
            }
        ) // TODO: check if there is a better filter that can remove other rooms as well

        if (location) {
            // Remove other rooms from floor-rooms array
            location.floors[0].rooms.forEach((room, idx) => {
                if (room.uid != req.params.uid) {
                    location.floors[0].rooms.splice(idx, 1)
                }
            })
            res.status(200).json(location)
        } else {
            res.status(404).json({ error: `Location not found.` })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while looking for location with uid ${req.params.uid}. [${err}]`
        })
    }
}

module.exports = {
    listLocations,
    listBuildings,
    getBuilding,
    getLocation
}
