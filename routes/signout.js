/**
 * 登出
 * Created by weihanwei on 2017/2/22.
 */
'use strict';
let express = require('express');
let router = express.Router();
let {checkLogin} = require('../middlewares/check');

router.get('/', checkLogin, (req, res) => {
  req.session.user = null;
  res.send({success: 1});
});

module.exports = router;