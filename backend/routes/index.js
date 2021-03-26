//api
const express = require('express')
const router = express.Router()

// Test
router.get('/', (req, res) => {
    res.status(200).send({ message: `This is the top level of the API` })
})

module.exports = router