/**
 * 数据库连接和数据库模型定义
 * Created by weihanwei on 2017/2/9.
 */
'use strict';
let config = require('config-lite');
let mongoose = require('mongoose');
let bluebird = require('bluebird');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise = bluebird;
mongoose.connect(config.mongodb);
/**
 * User
 */
let UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String},
  imgURL: {type: String, default: '/img/default.jpg'},
  gender: {type: String, enum: ['male', 'famale', 'unknown']},
  bio: {type: String}
});

exports.User = mongoose.model('User', UserSchema);

/**
 * Posts
 */
let PostSchema = new Schema({
  auther: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  content: {type: String},
  pv: {type: Number}
});

exports.Post = mongoose.model('Post', PostSchema);
