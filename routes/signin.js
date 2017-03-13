/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');
let {checkNotLogin} = require('../middlewares/check');

// 登录验证
router.post('/', checkNotLogin, (req, res) => {
  User.findByUsername(req.fields.username).then(user => {
    if (!user) {
      res.send({success: 0, msg: '用户名不存在。'});
    } else if (user.password !== req.fields.password) {
      res.send({success: 0, msg: '密码错误'});
    } else {
      req.session.user = user;
      res.send({success: 1});
    }
  }).catch(err => {
    res.send({success: 0, msg: "系统异常，请重试。"});
  });
});

module.exports = router;