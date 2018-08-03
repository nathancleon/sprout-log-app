const mongoose = require('mongoose');

let plantSchema = new mongoose.Schema({ 
  name: String,
  currentHealth: String,
  created: { type: String, default: new Date() }
});

module.exports = mongoose.model('plants', plantSchema);