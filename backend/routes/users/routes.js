// Packages
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// --------------------------- EXAM -----------------------------
// GET: Log in user (anyone)
const loginUser = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
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

        // Save to DB & send response to client-side
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

module.exports = {
    loginUser,
    createUser
}
