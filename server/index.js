require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const premiumRoutes = require('./routes/premium');

const app = express();

// CORS — frontend manzilini ruxsat berish
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    if (origin.endsWith('.onrender.com')) return cb(null, true);
    cb(new Error('CORS: ruxsat yo\'q'));
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/premium', premiumRoutes);

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }));

// MongoDB ulanish
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB ulandi'))
  .catch(err => { console.error('MongoDB xatosi:', err); process.exit(1); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ishlamoqda: port ${PORT}`));
