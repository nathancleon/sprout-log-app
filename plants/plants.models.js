const mongoose = require('mongoose');

//TODO:
//=====:update the schema to use new auth user id

let plantSchema = new mongoose.Schema({ 
  name: String,
  plantType: String,
  currentHealth: String,
  userID: {type: mongoose.Schema.ObjectId, ref: "users"},
  created: { type: String, default: new Date() },
  lastUpdated: { type: String, default: new Date() }
});

module.exports = mongoose.model('plants', plantSchema);