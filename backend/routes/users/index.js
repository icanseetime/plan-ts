//api/users
const express = require('express')
const router = express.Router()
const routes = require('./routes')

// Test
router.get('/', (req, res) => {
    res.status(200).send({ message: `👩‍🌾 This is the top level of the user collection` })
})

module.exports = router
