// Packages
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Database schemas
const User = require('../../models/User')
const Invite = require('../../models/Invite')

// POST: Invite new user
const inviteUser = async (req, res) => {
    try {
        // Check that invite with the same e-mail doesn't exist
        const existingInvite = await Invite.findOne({ email: req.body.email })
        if (existingInvite) {
            res.status(409).json({
                error: `An invite connected to this email already exists in the database.`
            })
        }

        // Check that user with the same e-mail doesn't exist
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            res.status(409).json({
                error: `A user with this email already exists in the database.`
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
        res.status(500).json(
            `Something went wrong while trying to create new invite. [${err}]`
        )
    }
}

// GET: Check for invite and retrieve information
const checkInvite = async (req, res) => {
    try {
        let existingInvite = await Invite.findOne({ _id: req.params.id })
        if (!existingInvite) {
            res.status(404).json({
                error: `No invite with this ID.`
            })
        }
        res.status(200).json({
            invite: existingInvite
        })
    } catch (err) {
        res.status(500).json(
            `Something went wrong while looking for invite with ID ${req.params.id}. [${err}]`
        )
    }
}

// DELETE: Delete invite
const deleteInvite = async (req, res) => {
    try {
        await Invite.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: `Successfully deleted invite.` })
    } catch (err) {
        res.status(500).json(
            `Something went wrong while trying to delete invite. [${err}]`
        )
    }
}

// POST: Register new user
const registerUser = async (req, res) => {
    try {
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

        // Delete/check invite
        const deletedInvite = await Invite.findOneAndDelete({
            email: req.body.email
        })
        if (!deletedInvite) {
            res.status(409).json({
                error: `Invite doesn't exist or was previously deleted, therefore user can not be registered at this time.`
            })
        }

        // Save new user to DB
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
            res.status(500).json(
                `Something went wrong while trying to log in. [${err}]`
            )
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

// GET: Get info about specific user by their ID
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

// DELETE: Delete user by ID
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

module.exports = {
    inviteUser,
    checkInvite,
    deleteInvite,
    registerUser,
    loginUser,
    listUsers,
    getUser,
    deleteUser
}
