const express = require('express');
const router  = express.Router();
const Contact = require('../models/Contact');
const Blog    = require('../models/Blog');
const User    = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/admin/stats  — dashboard overview
router.get('/stats', protect, async (req, res) => {
  try {
    const [
      totalContacts, newContacts,
      totalPosts, publishedPosts,
      totalUsers, recentContacts
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      User.countDocuments(),
      Contact.find({ status: 'new' }).sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({
      success: true,
      data: {
        contacts: { total: totalContacts, new: newContacts },
        blog:     { total: totalPosts, published: publishedPosts, drafts: totalPosts - publishedPosts },
        users:    { total: totalUsers },
        recentContacts,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/users  — list all users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/users  — create editor/admin
router.post('/users', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot delete yourself' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
