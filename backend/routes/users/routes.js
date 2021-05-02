// Packages
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Database schemas
const User = require('../../models/User')
const Invite = require('../../models/Invite')

// Services
const mailInvite = require('../../services/email')

// POST: Invite new user
const inviteUser = async (req, res) => {
    try {
        // Check that invite with the same e-mail doesn't exist
        const existingInvite = await Invite.findOne({ email: req.body.email })
        if (existingInvite) {
            return res.status(409).json({
                error: `An invite connected to this email already exists in the database.`
            })
        }

        // Check that user with the same e-mail doesn't exist
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(409).json({
                error: `A user with this email already exists in the database.`
            })
        }

        // Check that the userID of the manager creating the request exists in DB
        const manager = await User.findById(req.body.invited_by)
        if (!manager) {
            return res.status(400).json({
                error: `Manager with ID ${req.body.invited_by} does not exist in the database.`
            })
        }

        // Create invite object
        const newInvite = new Invite({
            email: req.body.email,
            role: req.body.role,
            invited_by: req.body.invited_by
        })

        // Save to DB and send response
        const invite = await newInvite.save()

        // Send e-mail to invitee
        await mailInvite(
            req.body.email,
            `${manager.name.first} ${manager.name.last}`,
            req.body.role,
            invite._id
        )

        // Send response to client-side
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
        let existingInvite = await (
            await Invite.findOne({ _id: req.params.id })
        )
            .populate('invited_by', 'name')
            .execPopulate()
        if (!existingInvite) {
            res.status(404).json({
                error: `No invite with this ID.`
            })
        } else {
            res.status(200).json(existingInvite)
        }
    } catch (err) {
        res.status(500).json(
            `Something went wrong while looking for invite with ID ${req.params.id}. [${err}]`
        )
    }
}

// GET: List invites
const listInvites = async (req, res) => {
    try {
        const invites = await Invite.find(req.query)
            .populate('invited_by', 'name')
            .exec()
        if (invites) {
            res.status(200).json(invites)
        } else {
            res.status(404).json({
                error: 'Could not find any invites.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find invites. [${err}]`
        })
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
            return res.status(409).json({
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

// POST: Log in user
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

// GET: Get information about own user profile
const getSelf = async (req, res) => {
    try {
        // Check that the user is trying to access their own profile
        if (req.user._id != req.params.id) {
            res.status(400).json({ error: 'No access.' })
        } else {
            // Find user (but do not return password and version no.)
            const user = await User.findById(req.params.id).select(
                '-password -__v'
            )
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ error: 'User not found.' })
            }
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while looking for user with ID ${req.params.id}. [${err}]`
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

// PUT: Update own user profile details
const updateSelf = async (req, res) => {
    try {
        // Check that the user is changing their own profile
        if (req.user._id != req.params.id) {
            return res.status(400).json({
                error: 'No access.'
            })
        }
        // Make sure no one tries to change their own role
        if (req.body.role) {
            return res.status(400).json({
                error: 'You can not change your own user role.'
            })
        }
        // Make sure there are update values provided
        if (Object.keys(req.body).length == 0) {
            return res.status(400).json({
                error: 'You need to include update values in a request body.'
            })
        }
        // Update user
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true }
        )
        // Check for found/updated user and send response to client
        if (!user) {
            res.status(404).json({
                error: `Could not find user with ID ${req.params.id}.`
            })
        } else {
            res.status(201).json({
                message: `User with ID ${req.params.id} was successfully updated.`
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to update user with ID ${req.params.id}. [${err}]`
        })
    }
}

// PUT: Update user role
const changeRole = async (req, res) => {
    try {
        // Check that new role is included in request
        if (!req.body.role) {
            res.status(400).json({
                error:
                    'You need to include the new role in the body of your request.'
            })
        } else {
            // Update role of the user by ID
            let user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { role: req.body.role },
                { runValidators: true }
            )
            if (user) {
                res.status(201).json({
                    message: `Successfully changed role of user with ID ${req.params.id}.`
                })
            } else {
                res.status(404).json({
                    error: `Could not find user with ID ${req.params.id}.`
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to update the user role. [${err}]`
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
    listInvites,
    deleteInvite,
    registerUser,
    loginUser,
    listUsers,
    getSelf,
    getUser,
    updateSelf,
    changeRole,
    deleteUser
}
