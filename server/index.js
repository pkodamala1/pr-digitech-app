const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ── Middleware ──
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ──
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/blog',    require('./routes/blog'));
app.use('/api/admin',   require('./routes/admin'));
app.use('/api/services',require('./routes/services'));

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PR Digitech API is running 🚀' });
});

// ── Connect MongoDB & start server ──
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    // Seed admin user on first run
    await require('./utils/seedAdmin')();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
