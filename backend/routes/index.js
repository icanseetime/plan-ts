//api
const express = require('express')
const router = express.Router()

// Test route
router.get('/', (req, res) => {
    res.status(200).send({
        message: `Congratulations. You have reached the top level of the Plan-ts API.`
    })
})

module.exports = router
