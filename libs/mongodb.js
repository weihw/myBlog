/**
 * Created by weihanwei on 2017/2/9.
 */
var config = require('config-lite');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var Schema = mongoose.Schema;
mongoose.promise = bluebird;
mongoose.connect(config.mongodb);
var UserSchema = new Schema({
  username: {type: String, unique: true, required: true, index: true},
  password: {type: String, required: true},
  imgURL: {type: String, default: '/img/default.jpg'},
  gender: {type: String, enum: ['male', 'famale', 'unknown']},
  bio: {type: String}
});
// User Model
module.exports.User = mongoose.model('User', UserSchema);