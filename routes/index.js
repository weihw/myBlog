/**
 * Created by weihanwei on 2/8/17.
 */
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {title: 'Hello World'});
  });
};