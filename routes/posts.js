/**
 * Created by weihanwei on 2017/3/13.
 */
'use strict';
let express = require('express');
let router = express.Router();
let {checkLogin} = require('../middlewares/check');
let Post = require('../models/post');

// 获取文章列表
router.get('/', function (req, res) {
  Post.findByAuthor().then(posts => {
    res.render('index', {postList: posts});
  }).catch(err => {
    res.send({success: 0, msg: "系统异常，请重试。"});
  });
});
// 发表文章
router.get('/create', checkLogin, function (req, res) {
  res.render('create');
});
// 发表文章
router.post('/create', checkLogin, function (req, res) {
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

// 查看单一文章
router.get('/one/:postId', function (req, res) {
  Post
    .findByPostId(req.params.postId)
    .then(post => {
      res.render('post', {topic: post})
    })
    .catch(err => res.redirect('/'));
});

module.exports = router;