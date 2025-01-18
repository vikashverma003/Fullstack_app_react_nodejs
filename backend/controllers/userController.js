const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   // console.log(token.userId);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in user', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find(); // Assuming userId is in the JWT payload
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
  };

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // Assuming userId is in the JWT payload
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
  };


// Middleware to verify the JWT
const authenticateToken = (req, res, next) => {
   // const token = req.header('Authorization')?.split(' ')[1]; // Assuming Bearer token
   const token = req.body.headers.Authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      console.log("Inside the jwt");
      console.log(user);
      req.user = user;
      next();
    });
  };

module.exports = { registerUser, loginUser,authenticateToken, getUser,getAllUsers};
