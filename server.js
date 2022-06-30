const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const secRoutes = require('./routes/secActionRoutes')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/sec-actions', secRoutes)


app.listen(port, () => console.log(`server started on ${port}`))
