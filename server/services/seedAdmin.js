const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminEmail = 'digitalheros@gmail.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const admin = new User({
        name: 'Digital Heroes Admin',
        email: adminEmail,
        password: 'digital12345', // Pre-save hook in User model will hash this with bcrypt
        role: 'admin',
      });

      await admin.save();
      console.log('✅ Admin account auto-created successfully: digitalheros@gmail.com');
    } else {
      console.log('ℹ️ Admin account already exists.');
    }
  } catch (error) {
    console.error('❌ Error auto-creating admin account:', error.message);
  }
};

module.exports = seedAdmin;
