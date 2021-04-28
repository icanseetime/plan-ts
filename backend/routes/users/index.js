//api/users
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// Get a list of users, filtered by query (no query = all users)
router.get(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.listUsers
)

// Register new user
router.post('/', routes.registerUser)

// Login user
router.post('/login', routes.loginUser)

// Get a list of invites
router.get(
    '/invites',
    passport.authenticate('manager', { session: false }),
    routes.listInvites
)

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

// Check for invite
router.get('/invites/:id', routes.checkInvite)

// Get users own profile details
router.get(
    '/:id',
    passport.authenticate('all-users', { session: false }),
    routes.getSelf
)

// Update users own profile details
router.put(
    '/:id',
    passport.authenticate('all-users', { session: false }),
    routes.updateSelf
)

// Get user by ID
router.get(
    '/:id/manage',
    passport.authenticate('manager', { session: false }),
    routes.getUser
)

// Delete specific user by ID
router.delete(
    '/:id/manage',
    passport.authenticate('manager', { session: false }),
    routes.deleteUser
)

// Update user e-mail/role
router.put(
    '/:id/role',
    passport.authenticate('manager', { session: false }),
    routes.changeRole
)

module.exports = router
