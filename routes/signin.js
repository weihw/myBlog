/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');
let checkNotLogin = require('../middlewares/check').checkNotLogin;

// 请求登录页
router.get('/', checkNotLogin, function (req, res) {
  res.render('signin');
});

// 登录验证
router.post('/', checkNotLogin, function (req, res) {
  User.findByUsername(req.fields.username).then(function (user) {
    if (!user) {
      res.send({success: 0, msg: '用户名不存在。'});
    } else if (user.password !== req.fields.password) {
      res.send({success: 0, msg: '密码错误'});
    } else {
      req.session.user = user;
      res.send({success: 1});
    }
  }).catch(function (err) {
    res.send({success: 0, msg: "系统异常，请重试。"});
  });
});

module.exports = router;