/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');
let path = require('path');
let unlink = Promise.promisify(require('fs').unlink);

// 用户注册数据提交
router.post('/', (req, res) => {
  let user = {
    username: req.fields.username,
    password: req.fields.password,
    gender: req.fields.gender,
    bio: req.fields.summary
  };
  if (typeof req.files.file !== 'undefined' && req.files.file.path.split(path.sep).pop()) {
    user.imgURL = req.files.file.path.split(path.sep).pop();
  }

  User.create(user)
    .then(user => {
      req.session.user = user;
      res.send({success: 1});
    })
    .catch(err => {
      console.log(err);
      unlink(req.files.file.path)
        .then(function () {
          res.send({success: 0, msg: '注册失败，请重试。'});
        })
        .catch(err => {
          console.log(err);
          res.send({success: 0, msg: '注册失败，请重试。'});
        });
    });
});

// 注册时检查用户名是否存在
router.get('/:username', (req, res) => {
  User.findByUsername(req.params.username).then(user => {
    if (!user) {
      res.send({success: 1});
    } else {
      res.send({success: 0, msg: '用户名已存在。'})
    }
  }).catch(err => {
    console.log(err);
    res.send({success: 0, msg: '服务器错误，请稍后再试。'});
  });
});

module.exports = router;