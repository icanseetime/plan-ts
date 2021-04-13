//api/plants
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// --- Access: anyone
// Get a list of plants, filtered by query (no query = all plants)
router.get('/', routes.listPlants)

// Get plant by ID
router.get('/:id', routes.getPlant)

// --- Access: gardeners

// --- Access: managers
// Add new plant
router.post(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.createPlant
)

module.exports = router
