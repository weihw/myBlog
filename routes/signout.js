/**
 * 登出
 * Created by weihanwei on 2017/2/22.
 */
'use strict';
let express = require('express');
let router = express.Router();
let checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function (req, res) {
  req.session.user = null;
  res.send({success: 1});
});

module.exports = router;