const express = require('express')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {

    return res.json({message: "Gas"})
} )


app.listen(port, () => console.log(`server started on ${port}`))
