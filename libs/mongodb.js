/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict'
let config = require('config-lite');
let mongoose = require('mongoose');
let bluebird = require('bluebird');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise = bluebird;
mongoose.connect(config.mongodb);

let UserSchema = new Schema({
  username: {type: String},
  password: {type: String},
  imgURL: {type: String, default: '/img/default.jpg'},
  gender: {type: String, enum: ['male', 'famale', 'unknown']},
  bio: {type: String}
});
// User Model
module.exports.User = mongoose.model('User', UserSchema);