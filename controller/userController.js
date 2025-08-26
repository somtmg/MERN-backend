const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
//registerUser = asyncHandler(async (req, res) => {
//    if (!req.body.text) {
//        res.status(400)
//        throw new Error('Name is required')
//    }
//    const userName = await User.create(req.body.name)
//    res.status(200).json(userName)

//    if (!req.body.text) {
//        res.status(400)
//        throw new Error('email is required')
//    }
//    const userEmail = await User.create(req.body.email)
//    res.status(200).json(userEmail)

//    if (!req.body.text) {
//        res.status(400)
//        throw new Error('password is required')
//    }
//    const userPassword = await User.create(req.body.password)
//    res.status(200).json(userPassword)

//    const registerUser = 
//})


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // for the mandatory field
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    // for unique email
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User Exists')
    }

    // using bycrpt to hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ name, email, password: hashedPassword })

    if (user) {
        res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user._id) })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    //res.json({ message: 'Register User successful' })
})
const loginUser = asyncHandler(async (req, res) => {
    // comparing if email exists
    const { email, password } = req.body
    const user = await User.findOne({ email })
    // checking if password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user._id) })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
    //res.json({ message: 'Login User successful' })
})
const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({ id: _id, name, email })
    res.json({ message: 'Current User data' })
})

const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' })

module.exports = { registerUser, loginUser, getCurrentUser }

