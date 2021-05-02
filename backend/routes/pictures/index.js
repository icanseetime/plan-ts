//api/pictures
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// Upload file
router.post(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.uploadFile
)

// Delete file
router.delete(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.deleteFile
)

module.exports = router
