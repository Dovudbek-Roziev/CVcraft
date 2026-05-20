const express = require('express');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/premium/status  — foydalanuvchi premium holatini tekshiradi
router.get('/status', protect, async (req, res) => {
  try {
    const user = req.user;
    const now = new Date();

    const active = user.isPremium && user.premiumExpiry && now < user.premiumExpiry;

    // Auto expire
    if (user.isPremium && !active) {
      user.isPremium = false;
      await user.save();
    }

    const daysLeft = active
      ? Math.ceil((user.premiumExpiry - now) / (1000 * 60 * 60 * 24))
      : 0;

    res.json({
      isPremium: active,
      premiumExpiry: user.premiumExpiry,
      premiumActivatedAt: user.premiumActivatedAt,
      daysLeft,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
});

// POST /api/premium/activate  — ADMIN: foydalanuvchiga premium beradi
// Body: { email, days? }  (default 30 kun)
router.post('/activate', protect, adminOnly, async (req, res) => {
  try {
    const { email, days = 30 } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email kiritish kerak' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    const now = new Date();
    // Agar hali premium muddati tugamagan bo'lsa — ustiga qo'shamiz
    const base = user.isPremium && user.premiumExpiry && user.premiumExpiry > now
      ? user.premiumExpiry
      : now;

    user.isPremium = true;
    user.premiumActivatedAt = now;
    user.premiumExpiry = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);

    await user.save();

    res.json({
      message: `Premium ${days} kunga faollashtirildi`,
      email: user.email,
      premiumExpiry: user.premiumExpiry,
      daysLeft: days,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
});

// POST /api/premium/deactivate  — ADMIN: premiumni o'chiradi
// Body: { email }
router.post('/deactivate', protect, adminOnly, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });

    user.isPremium = false;
    user.premiumExpiry = null;
    await user.save();

    res.json({ message: 'Premium o\'chirildi', email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
});

// GET /api/premium/users  — ADMIN: barcha premiumli foydalanuvchilar
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ isPremium: true })
      .select('email name isPremium premiumExpiry premiumActivatedAt createdAt')
      .sort({ premiumExpiry: 1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
});

module.exports = router;
