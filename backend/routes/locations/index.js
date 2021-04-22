//api/locations
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// -------------------------------- Access: anyone
router.get('/', routes.listLocations)

router.get('/buildings', routes.listBuildings)

router.get('/buildings/:no', routes.getBuilding)

router.get('/:uid', routes.getLocation)

module.exports = router
