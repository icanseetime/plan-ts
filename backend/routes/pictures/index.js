//api/pictures
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// Upload file
router.post('/', routes.uploadFile)

// TODO: lock for managers after someone adds auth headers to route

// Delete file
router.delete(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.deleteFile
)

module.exports = router
