const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

/**
@desc Register new user
@route POST /api/users
**/
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Všechna pole jsou povinná');
    }

    if (await User.findOne({ email: email })) {
        res.status(400);
        throw new Error('Uživatel s touto e-mailovou adresou již existuje');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    });
    user.save();

    if (user) {
        res.status(201).json({
            message: 'Uživatel byl úspěšně zaregistrován',
            user: {
                id: user.id,
                token: createToken(user.id),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } else {
        res.status(400);
        throw new Error('Registrace se nezdařila, zkuste to prosím znovu.');
    }
});
/**
@desc Login user
@route POST /api/users/login
**/
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            message: 'Uživatel byl úspěšně přihlášen',
            user: {
                id: user.id,
                token: createToken(user.id),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } else {
        res.status(403);
        throw new Error('Zadané uživatelské údaje jsou nesprávné');
    }
});

/**
@desc Get logged in user
@route GET /api/users/login
**/
const getLoggedInUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

/**
@desc Generate user JWT
**/
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '60d'
    });
}

module.exports = {
    registerUser,
    loginUser,
    getLoggedInUser
}