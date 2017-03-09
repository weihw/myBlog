/**
 * Created by weihanwei on 2/8/17.
 */
'use strict';
module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index');
  });
  app.use('/signin', require('./signin'));
  app.use('/signup', require('./signup'));
};