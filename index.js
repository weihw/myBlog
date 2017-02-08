/**
 * Created by weihanwei on 2/8/17.
 */
var path = require('path');
var express = require('express');
var app = express();
var routes = require('./routes');

// set view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// route
routes(app);

// start server
app.listen(3000, function () {
  console.log('server listening on port: 3000');
});

