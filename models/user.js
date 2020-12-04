const mongoose = require('mongoose');
const userSchema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

/* ADMIN SCHEMA */
const Admin = new userSchema({
  username: String,
  password: String
});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', Admin);