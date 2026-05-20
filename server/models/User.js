const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    trim: true,
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  premiumActivatedAt: {
    type: Date,
    default: null,
  },
  premiumExpiry: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Check if premium is still active
UserSchema.methods.checkPremiumStatus = function () {
  if (!this.isPremium) return false;
  if (!this.premiumExpiry) return false;
  if (new Date() > this.premiumExpiry) {
    this.isPremium = false;
    this.save();
    return false;
  }
  return true;
};

module.exports = mongoose.model('User', UserSchema);
