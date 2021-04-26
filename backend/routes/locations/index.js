//api/locations
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// Create new location
router.post(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.createLocation
)

// List all location objects
router.get('/', routes.listLocations)

// List only distinct buildings (name/no)
router.get('/buildings', routes.listBuildings)

// List distinct floors based on building
router.get('/:building/floors', routes.listFloors)

// List distinct rooms based on building and floor
router.get('/:building/:floor', routes.listRooms)

// Get specific location by ID
router.get('/:id', routes.getLocation)

module.exports = router
