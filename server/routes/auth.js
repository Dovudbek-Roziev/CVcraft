const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email va parol kiritish kerak' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }

    const user = await User.create({ email, password, name });
    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        premiumExpiry: user.premiumExpiry,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email va parol kiritish kerak' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email yoki parol noto\'g\'ri' });
    }

    // Auto-expire premium check
    if (user.isPremium && user.premiumExpiry && new Date() > user.premiumExpiry) {
      user.isPremium = false;
      await user.save();
    }

    const token = signToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        premiumExpiry: user.premiumExpiry,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  try {
    const user = req.user;

    // Auto-expire premium check
    if (user.isPremium && user.premiumExpiry && new Date() > user.premiumExpiry) {
      user.isPremium = false;
      await user.save();
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      isPremium: user.isPremium,
      premiumExpiry: user.premiumExpiry,
      premiumActivatedAt: user.premiumActivatedAt,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
});

module.exports = router;
