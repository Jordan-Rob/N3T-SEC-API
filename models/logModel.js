const mongoose = require('mongoose')

const logSchema = mongoose.Schema({
    cmd: {
        type: String,
    },
    output: {
        type: String,
    }
}, {
    timestamps: true, //automatically adds created at and updated at
})

module.exports = mongoose.model('Log', logSchema)