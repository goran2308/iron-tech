const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

/* ADMIN SCHEMA */
const Admin = new Schema({
  username: String,
  password: String
});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', Admin);