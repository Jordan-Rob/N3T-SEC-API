const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const asyncHandler = require('express-async-handler')


//Token generation function
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

//@desc register user
//@route POST /api/users
//@access public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password ){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    //check if user already exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists!')
    }

    // Hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    //Create User object
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPass
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


//@desc login user
//@route POST /api/users
//@access public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    // check email
    const user = await User.findOne({email})

    if( user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user credentials')
    }
})


//@desc get currently signed in user
//@route GET /api/users
//@access private
const getMe = asyncHandler( async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })
})


module.exports = {
    registerUser,
    loginUser,
    getMe
}




