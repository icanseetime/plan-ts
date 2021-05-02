if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Packages and services
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
require('./auth/auth')
const fileUpload = require('express-fileupload')
const swagger = require('swagger-ui-express')
const yaml = require('yamljs')

// Routers
const apiRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const plantsRouter = require('./routes/plants')
const locationsRouter = require('./routes/locations')
const feedbackRouter = require('./routes/feedback')
const picturesRouter = require('./routes/pictures')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(passport.initialize())
app.use(fileUpload())

// Database connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
const db = mongoose.connection
db.on('error', (error) => console.error('❌ Database connection\n', error)) // TODO: remove all emojis at the end of project
db.on('open', () => console.log('✅ Database connection'))

// Documentation
const documentation = yaml.load('./docs/swagger.yaml')

// Endpoints
app.use('/api', apiRouter)
app.use('/api/users', usersRouter)
app.use('/api/plants', plantsRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/pictures', picturesRouter)
app.use('/api/docs', swagger.serve, swagger.setup(documentation))

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({ error: `${err}` })
})

// Server
app.listen(process.env.PORT || 5000, () =>
    console.log(`✅ Server running [👂:${process.env.PORT}]`)
)
