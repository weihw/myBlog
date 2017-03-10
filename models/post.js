/**
 * Created by weihanwei on 2017/3/10.
 */
'use strict';
let {Post: PostModel} = require('../libs/mongodb');

module.exports = {
  create: post => PostModel.create(post)
};