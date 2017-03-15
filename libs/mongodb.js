/**
 * 数据库连接和数据库模型定义
 * Created by weihanwei on 2017/2/9.
 */
'use strict';
let config = require('config-lite');
let mongoose = require('mongoose');
let bluebird = require('bluebird');
// let moment = require('moment');
// let marked = require('marked');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise = bluebird;
mongoose.connect(config.mongodb);
/**
 * User
 */
let UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String},
  imgURL: {type: String, default: 'default.png'},
  gender: {type: String, enum: ['male', 'famale', 'unknown']},
  bio: {type: String}
});

exports.User = mongoose.model('User', UserSchema);

/**
 * Posts
 */
let PostSchema = new Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  content: {type: String},
  pv: {type: Number},
  createAt: {type: Date, default: new Date()}
});

// 将schema的 createAt 从 Date() 转换成 YYYY-MM-DD
// PostSchema.post('findOne', post => {
//   if (post) {
//     let temp = moment(post.createAt);
//     temp = temp.format('YYYY-MM-DD');
//     // post.content = marked(post.content);
//     console.log(`Schema: ${temp}`);
//     post.createAt = temp;
//   }
//   return post;
// });
exports.Post = mongoose.model('Post', PostSchema);
