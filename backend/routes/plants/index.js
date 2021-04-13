//api/plants
const express = require('express')
const router = express.Router()
const routes = require('./routes')

// Get a list of plants, filtered by query (no query = all plants)
router.get('/', routes.listPlants)

// Add new plant
router.post('/', routes.createPlant)

module.exports = router
