/**
 * Created by weihanwei on 2017/2/9.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('signin');
});

module.exports = router;