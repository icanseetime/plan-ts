//api/users
const express = require('express')
const router = express.Router()
const routes = require('./routes')
const passport = require('passport')

// // Test
// router.get('/', (req, res) => {
//     res.status(200).send({
//         message: `👩‍🌾 This is the top level of the user collection`
//     })
// })

// --------------------------- EXAM -----------------------------

// --- Access: anyone
// Login user (send JWT if successful)
router.get('/login', routes.loginUser)

// --- Access: managers
// Get a list of users, filtered by query (no query = all users)
router.get(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.listUsers
)

// Get user by ID
router.get(
    '/:id',
    passport.authenticate('manager', { session: false }),
    routes.getUser
)

// Add new user
router.post(
    '/',
    passport.authenticate('manager', { session: false }),
    routes.createUser
)

// Reset user password (maybe PUT?)
router.post(
    '/:id/reset-password',
    passport.authenticate('manager', { session: false }),
    routes.resetUserPass
)

// Update details of specific user by ID
router.put(
    '/:id',
    passport.authenticate('manager', { session: false }),
    routes.updateUserDetails
)

// Delete specific user by ID
router.delete(
    '/:id',
    passport.authenticate('manager', { session: false }),
    routes.deleteUser
)

module.exports = router
