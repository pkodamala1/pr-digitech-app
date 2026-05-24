const express = require('express');
const router  = express.Router();
const Blog    = require('../models/Blog');
const { protect } = require('../middleware/auth');

// GET /api/blog  — public, published posts
router.get('/', async (req, res) => {
  const { category, featured, page = 1, limit = 9 } = req.query;
  const filter = { status: 'published' };
  if (category) filter.category = category;
  if (featured)  filter.featured = true;
  try {
    const total = await Blog.countDocuments(filter);
    const posts = await Blog.find(filter)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-content');
    res.json({ success: true, data: posts, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/blog/all  — admin, all posts including drafts
router.get('/all', protect, async (req, res) => {
  try {
    const posts = await Blog.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/blog/:slug  — public, single post
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name avatar');
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/blog  — admin create
router.post('/', protect, async (req, res) => {
  try {
    const post = await Blog.create({ ...req.body, author: req.user._id });
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/blog/:id  — admin update
router.put('/:id', protect, async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/blog/:id  — admin delete
router.delete('/:id', protect, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
