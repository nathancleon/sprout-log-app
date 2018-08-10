const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({ 
  name: String,
  email: String,
  password: String,
  created: { type: String, default: new Date() }
});

module.exports = mongoose.model('users', userSchema);