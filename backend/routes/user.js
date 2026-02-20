const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user error:', error);
    res.json({ success: false, error: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username } = req.body;
    
    const existingUser = await User.findOne({ username, _id: { $ne: userId } });
    if (existingUser) {
      return res.json({ success: false, error: 'Username already taken' });
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Update user error:', error);
    res.json({ success: false, error: 'Failed to update user' });
  }
});

module.exports = router;
