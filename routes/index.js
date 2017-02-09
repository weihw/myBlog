/**
 * Created by weihanwei on 2/8/17.
 */
'use strict'

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });
  app.use('/signin', require('./signin'));
  app.use('/signup', require('./signup'));
};