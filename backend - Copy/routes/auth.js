const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, error: 'Username already exists' });
    }
    
    const user = new User({ username, password });
    await user.save();
    
    res.json({ success: true, userId: user._id });
  } catch (error) {
    console.error('Register error:', error);
    res.json({ success: false, error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username, password });
    
    if (!user) {
      return res.json({ success: false, error: 'Invalid username or password' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    res.json({ success: true, userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.json({ success: false, error: 'Login failed' });
  }
});

module.exports = router;
