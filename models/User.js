const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({  
  couple_user_name: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  player1_id: {type: String, required: true},
  player2_id: {type: String, required: true}
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
