/**
 * Created by weihanwei on 2017/3/13.
 */
'use strict';
let express = require('express');
let router = express.Router();
let {checkLogin} = require('../middlewares/check');
let marked = require('marked');
let moment = require('moment');
let Post = require('../models/post');

// 获取文章列表
router.get('/', function (req, res) {
  Post.findByAuthor().then(posts => {
    res.render('index', {postList: posts});
  }).catch(err => {
    res.send({success: 0, msg: "系统异常，请重试。"});
  });
});
// 发表文章页
router.get('/creation/:postId', checkLogin, function (req, res) {
  let postId = req.params.postId;
  if (postId === 'new') {
    res.render('create', {_id: '', title: '', content: ''});
  } else {
    Post
      .findByPostId(postId)
      .then(post => {
        res.render('create', {_id: post._id, title: post.title, content: post.content});
      })
      .catch(err => res.redirect('/'));
  }
});
// 新增文章
router.post('/creation', checkLogin, function (req, res) {
  let post = {
    author: req.session.user._id,
    title: req.fields.title,
    content: req.fields.content,
    pv: 0
  };
  Post.create(post)
    .then(post => {
      res.send({success: 1});
    })
    .catch(err => {
      res.send({success: 0, msg: '文章发表失败。'});
    });
});
// 修改文章
router.put('/creation/:postId', checkLogin, function (req, res) {
  let data = {
    postId: req.params.postId,
    title: req.fields.title,
    content: req.fields.content
  };
  Post.updateByPostId(data)
    .then(function () {
      res.send({success: 1, msg: '更新成功'});
    })
    .catch(err => {
      res.send({success: 0, msg: '文章发表失败。'});
    });
});

// 查看单一文章
router.get('/one/:postId', function (req, res) {
  Post
    .findByPostId(req.params.postId)
    .then(post => {
      // post.createAt = moment(post.createAt).format('YYYY-MM-DD');
      post.createAt = '123123123';
      // console.log(`router:${moment(post.createAt).format('YYYY-MM-DD')}`);
      console.log(`router:${post.createAt}`);
      post.content = marked(post.content);
      console.log(`router:${post.content}`);
      res.render('post', {topic: post})
    })
    .catch(err => res.redirect('/'));
});

module.exports = router;