//api/feedback
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// POST: Create new feedback
router.post('/', routes.createFeedback)

// GET: Get list of all feedback
router.get(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.listFeedback
)

// GET: Get specific feedback object
router.get(
    '/:id',
    passport.authenticate('manager', { session: false }),
    routes.getFeedback
)

// DELETE: Delete specific feedback object
router.delete(
    '/:id',
    passport.authenticate('manager', { session: false }),
    routes.deleteFeedback
)

module.exports = router
