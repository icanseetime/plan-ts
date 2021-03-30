const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../models/User')

const formFields = {
    usernameField: 'email',
    passwordField: 'password'
}

// Signup strategy // TODO: check
passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await User.create({ email, password })
            return done(null, user)
        } catch (err) {
            done(err)
        }
    }
))

// Login strategy
passport.use('login', new LocalStrategy(formFields, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { error: 'Could not find user.' })
        } else {
            // Validate password
            const validPass = await user.validPassword(password, user.password)
            if (!validPass) {
                return done(null, false, { error: 'Invalid password.' })
            } else {
                return done(null, user, { message: 'Successfully logged in.' })
            }
        }
    } catch (err) {
        return done(err)
    }
}))

// JWT verification strategies
// Gardeners and above
passport.use('all-users', new JWTstrategy(
    {
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('token')
    },
    async (token, done) => {
        try {
            return done(null, token.user)
        } catch (err) {
            done(err)
        }
    }
))

// Managers only
passport.use('manager', new JWTstrategy(
    {
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('token')
    },
    async (token, done) => {
        try {
            if (token.user.role === 'manager') {
                return done(null, token.user)
            } else {
                return done(null, false)
            }
        } catch (err) {
            done(err)
        }
    }
))

// TODO: remember to sign JWT in login route