/**
 * Created by weihanwei on 2017/3/10.
 */
'use strict';
let {Post: PostModel} = require('../libs/mongodb');


module.exports = {
  create: post => PostModel.create(post),
  updateByPostId: ({postId, title, content}) => {
    return PostModel
      .update({_id: postId}, {title: title, content: content})
      .exec();
  },
  findByAuthorId: authorId => {
    let query = {};
    if (authorId) {
      query.author = authorId;
    }
    return PostModel
      .find(query)
      .populate({path: 'author', model: 'User'})
      .sort({_id: -1})
      .exec();
  },
  findByPostId: postId => {
    return PostModel
      .findOne({_id: postId})
      .populate({path: 'author', model: 'User'})
      .exec()
  }
};