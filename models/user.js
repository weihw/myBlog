/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict'
var UserModel = require('../libs/mongodb').User;

module.exports = {
  create: function(user){
    return new UserModel(user).save();
  },
  findByUsername: function (username) {
    return UserModel.findOne({username: username}).exec();
  }
};