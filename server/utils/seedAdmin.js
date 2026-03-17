const User = require('../models/User');

module.exports = async function seedAdmin() {
  try {
    const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!exists) {
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
      });
      console.log(`✅ Admin user created: ${process.env.ADMIN_EMAIL}`);
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};
