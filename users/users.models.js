const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({ 
  local       : {
    name      : String,
    email     : String,
    password  : String,
    created   : { type: String, default: new Date() }
  },
  facebook    : {
    id        : String,
    token     : String,
    name      : String,
    email     : String
  },
  google      : {
    id        : String,
    token     : String,
    email     : String,
    name      : String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);