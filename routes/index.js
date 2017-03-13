/**
 * Created by weihanwei on 2/8/17.
 */
'use strict';
module.exports = app => {
  app.get('/', (req, res) => {
    res.redirect('/posts');
  });
  app.use('/signin', require('./signin'));
  app.use('/signup', require('./signup'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
};