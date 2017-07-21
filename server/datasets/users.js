var mongoose    = require('mongoose');

module.exports = mongoose.model('movie', {

  name: String,

  email: String,

  address: String,

  phone: Number,

  notes: String,

});