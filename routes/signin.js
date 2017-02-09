/**
 * Created by weihanwei on 2017/2/9.
 */
'use strict'
let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
  res.render('signin');
});

router.post('/', function (req, res) {
  console.log(`------------signin post request------------`);
  console.log(req.fields);
  console.log(`------------signin post request------------`);
  res.send({success: 1});
});

module.exports = router;