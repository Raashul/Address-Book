var mongoose    = require('mongoose');

module.exports = mongoose.model('address_book_posts', {

  name: String,

  email: String,

  address: String,

  phone: Number,

  notes: String,

});