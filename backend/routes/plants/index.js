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
// Water plant
router.put(
    '/:id/water',
    passport.authenticate('all-users', { session: false }),
    routes.waterPlant
)

// Fertilize plant
router.put(
    '/:id/fertilize',
    passport.authenticate('all-users', { session: false }),
    routes.fertilizePlant
)

// Move plant
router.put(
    '/:id/move',
    passport.authenticate('all-users', { session: false }),
    routes.movePlant
)

// --- Access: managers
// Add new plant
router.post(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.createPlant
)

module.exports = router
