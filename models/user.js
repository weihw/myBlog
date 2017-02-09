/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict'
var User = require('../libs/mongodb').User;

module.exports = {
  create: function(user){
    let us = new User(user);
    return us.save().exec();
  },
  findByUsername: function (username) {
    return User.findOne({username: username}).exec();
  }
};