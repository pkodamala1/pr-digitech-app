const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName:  { type: String, required: true, trim: true },
  lastName:   { type: String, required: true, trim: true },
  email:      { type: String, required: true, lowercase: true },
  phone:      { type: String, default: '' },
  company:    { type: String, default: '' },
  service:    { type: String, default: 'General Enquiry' },
  budget:     { type: String, default: '' },
  message:    { type: String, required: true },
  status:     { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  notes:      { type: String, default: '' },   // admin internal notes
  ipAddress:  { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
