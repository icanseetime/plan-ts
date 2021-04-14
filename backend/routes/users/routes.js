// Packages
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Database schemas
const User = require('../../models/User')
const Invite = require('../../models/Invite')

// POST: Invite new user
const inviteUser = async (req, res) => {
    try {
        // Check that invite doesn't exist
        const existingInvite = await Invite.findOne({ email: req.body.email })
        if (existingInvite) {
            res.status(409).json({
                error: `An invite connected to this email already exists in the database.`
            })
        }

        // Create invite object
        const newInvite = new Invite({
            email: req.body.email,
            role: req.body.role,
            invited_by: req.body.userID
        })

        // Save to DB and send response
        const invite = await newInvite.save()
        // TODO: send e-mail to invitee here
        res.status(201).json({
            message: 'New invite successfully created.',
            invite: invite
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

// GET: Log in user
const loginUser = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = err ? new Error(err) : new Error(info.error)
                return next(error)
            } else {
                req.login(user, { session: false }, async (error) => {
                    if (error) {
                        return next(error)
                    }
                    // Generate and return JWT
                    const body = {
                        _id: user._id,
                        role: user.role
                    }
                    const token = jwt.sign(
                        { user: body },
                        process.env.TOKEN_SECRET
                    )
                    return res.json({ token })
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })(req, res, next)
}

// GET: See a list of users -- can be filtered by query
const listUsers = async (req, res) => {
    try {
        // Find users (but do not return password and version no.)
        let users = await User.find(req.query).select('-password -__v')
        if (users.length) {
            res.status(200).json(users)
        } else {
            res.status(404).json({ error: 'Could not find any users.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find users. [${err}]`
        })
    }
}

// GET: Get info about specific user by their ID (manager)
const getUser = async (req, res) => {
    try {
        // Find user (but do not return password and version no.)
        const user = await User.findById(req.params.id).select('-password -__v')
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ error: 'User not found.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while looking for user with ID ${req.params.id}. [${err}]`
        })
    }
}

// PUT: Update user details (except password & ID!)
const updateUserDetails = async (req, res) => {
    try {
        // Make sure request doesn't include password
        if (!req.body.password) {
            // Update user and get response
            const user = await User.findByIdAndUpdate(req.params.id, req.body) // TODO: update name only works with "name.first" and "name.last" - check if there is a better solution
            console.log(user)
            // Check for found user
            if (!user) {
                res.status(404).json({
                    error: `Could not find a user with the ID ${req.params.id}.`
                })
            } else {
                res.status(201).json({
                    message: `User with ID ${req.params.id} was successfully updated.`
                })
            }
        } else {
            res.status(403).json({
                error: `You should not include user passwords in your request.` // TODO: include more info in this error message when "password-reset" functionality is ready
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to update the user. [${err}]`
        })
    }
}

// DELETE: Delete user by ID (manager)
const deleteUser = async (req, res) => {
    try {
        // Check that user exists in DB
        let existingUser = await User.findById(req.params.id)
        if (existingUser) {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({
                message: `User with ID ${req.params.id} deleted successfully.`
            })
        } else {
            res.status(404).json({
                error: 'There is no user with this ID in the database.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to delete the user. [${err}]`
        })
    }
}

// --------------------------- EXAM -----------------------------

// POST: Create new user (manager)
const createUser = async (req, res) => {
    try {
        // Check that user e-mail does not exist in DB
        let existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            res.status(409).json({
                error: `A user with this email already exists in the database.` // TODO: check security
            })
        }

        // Create user object
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: {
                first: req.body.firstName,
                last: req.body.lastName
            },
            role: req.body.role
        })

        // Save to DB and send response
        const user = await newUser.save()
        res.status(201).json({
            message: 'New user successfully created.',
            user: user
        })
    } catch (err) {
        res.status(500).json({
            error: `There was an error adding ${req.body.email} to the database. [${err}]`
        })
    }
}

// POST: Reset user password
const resetUserPass = async (req, res) => {
    try {
        let existingUser = User.findById(req.params.id)
        if (!existingUser) {
            res.status(404).json({ error: 'User not found.' })
        }

        // TODO:
        // - Save "password-reset" in a new database with own ID + ID of the user that is having their password reset
        // - Create URL using the new ID as the end of the URI (get site-url som env?)
        // - Send URL in e-mail to the user with the given ID
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to reset password of user with ID ${req.params.id}. [${err}]`
        })
    }
}

module.exports = {
    inviteUser,
    loginUser,
    listUsers,
    getUser,
    // createUser,
    // resetUserPass,
    updateUserDetails,
    deleteUser
}
