const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please Enter Name!']
    },
    email:{
        type:String,
        required: [true, 'Please Enter Email!']
    },
    password:{
        type: String,
        required: [true, 'Please Enter Password!']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)