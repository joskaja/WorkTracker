const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getLoggedInUser
} = require('../controllers/userController');
const protectRoute = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/login', protectRoute, getLoggedInUser);

module.exports = router