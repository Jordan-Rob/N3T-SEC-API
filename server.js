const express = require('express')
const dotenv = require('dotenv').config()
const secRoutes = require('./routes/secActionRoutes')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/sec-actions', secRoutes)


app.listen(port, () => console.log(`server started on ${port}`))
