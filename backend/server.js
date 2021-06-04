if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Packages and services
const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
// const cors = require('cors')
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
// app.use(cors())
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
db.on('error', (error) => console.error('Database connection failed\n', error))
db.on('open', () => console.log('Connected to database'))

// Documentation
let documentation
if (process.env.NODE_ENV === 'production') {
    documentation = yaml.load('./backend/docs/swagger.yaml')
} else {
    documentation = yaml.load('./docs/swagger.yaml')
}

// Endpoints
app.use('/api', apiRouter)
app.use('/api/users', usersRouter)
app.use('/api/plants', plantsRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/pictures', picturesRouter)
app.use('/api/docs', swagger.serve, swagger.setup(documentation))

// Serve client from backend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./frontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'))
    })
}

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({ error: `${err}` })
})

// Server
app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
)
