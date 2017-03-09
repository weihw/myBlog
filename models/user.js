/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict';
let {User: UserModel} = require('../libs/mongodb');

module.exports = {
  create: user => UserModel.create(user),
  findByUsername: username => UserModel.findOne({username: username}).exec()
};