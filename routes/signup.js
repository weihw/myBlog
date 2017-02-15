/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict'
let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.get('/', function (req, res) {
  res.render('signup');
});

router.post('/', function (req, res) {
  let user = {
    username: req.fields.username,
    password: req.fields.password,
    gender: req.fields.sex,
    bio: req.fields.summary
  };
  User.create(user)
    .then(function (result) {
      console.log(result);
      res.send({success: 1});
    })
    .catch(function (err) {
      console.log(err);
      res.send({success: 0});
    });
});

module.exports = router;