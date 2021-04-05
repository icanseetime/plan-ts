//api/users
const express = require('express')
const router = express.Router()
const routes = require('./routes')

// Test
router.get('/', (req, res) => {
    res.status(200).send({
        message: `👩‍🌾 This is the top level of the user collection`
    })
})

// --------------------------- EXAM -----------------------------

// --- Access: anyone
// Login user (send JWT if successful)
router.get('/login', routes.loginUser)

router.post('/new', routes.createUser)

module.exports = router
