const mongoose = require('mongoose');
const slugify  = require('slugify');

const blogSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, unique: true },
  excerpt:     { type: String, required: true, maxlength: 300 },
  content:     { type: String, required: true },
  coverImage:  { type: String, default: '' },
  category:    { type: String, default: 'Digital PR', enum: [
    'Digital PR','Brand Strategy','SEO','Social Media',
    'Media Outreach','Content Marketing','AI & Technology','Case Study'
  ]},
  tags:        [{ type: String }],
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status:      { type: String, enum: ['draft', 'published'], default: 'draft' },
  featured:    { type: Boolean, default: false },
  views:       { type: Number, default: 0 },
  readTime:    { type: String, default: '5 min read' },
  metaTitle:   { type: String },
  metaDesc:    { type: String },
}, { timestamps: true });

// Auto generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
