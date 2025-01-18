const express = require('express');
const { registerUser, loginUser, getUser,authenticateToken, getAllUsers} = require('../controllers/userController');

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);


router.post('/getUser', authenticateToken, getUser);
router.post('/getAll', getAllUsers);


module.exports = router;
