const express = require('express');
const router = express.Router();
const admin = require('../config/firebase');
const User = require('../models/User');

// Signup with email/password
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const userRecord = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
      disabled: false
    });

    const user = new User({
      firebaseUid: userRecord.uid,
      email: userRecord.email
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().getUserByEmail(email);
    
    // In production, use Firebase Client SDK for authentication
    // This is just for demonstration
    const token = await admin.auth().createCustomToken(user.uid);
    
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

module.exports = router;