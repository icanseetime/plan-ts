//api/users
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// --- Access: anyone
// Login user (send JWT if successful)
router.get('/login', routes.loginUser)

// Check for invite
router.get('/invites/:id', routes.checkInvite)

// // Add new user
router.post('/', routes.registerUser)

// --- Access: self
router.get(
    '/:id',
    passport.authenticate('all-users', { session: false }),
    routes.getSelf
)

router.put(
    '/:id',
    passport.authenticate('all-users', { session: false }),
    routes.updateSelf
)

// --- Access: gardeners

// --- Access: managers

// Invite new user
router.post(
    '/invites',
    passport.authenticate('manager', { session: false }),
    routes.inviteUser
)

// Delete invite
router.delete(
    '/invites/:id',
    passport.authenticate('manager', { session: false }),
    routes.deleteInvite
)

// Get a list of users, filtered by query (no query = all users)
router.get(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.listUsers
)

// Get user by ID
router.get(
    '/:id/manage',
    passport.authenticate('manager', { session: false }),
    routes.getUser
)

// Update user e-mail/role
router.put(
    '/:id/role',
    passport.authenticate('manager', { session: false }),
    routes.changeRole
)

// Delete specific user by ID
router.delete(
    '/:id/manage',
    passport.authenticate('manager', { session: false }),
    routes.deleteUser
)

module.exports = router
