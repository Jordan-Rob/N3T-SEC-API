const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const secRoutes = require('./routes/secActionRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db')
const cors = require('cors')

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/sec-actions', secRoutes)
app.use('/api/users', userRoutes)


app.listen(port, () => console.log(`server started on ${port}`))
