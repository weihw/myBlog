/**
 * Created by weihanwei on 2/8/17.
 */
var path = require('path');
var express = require('express');
var formidable = require('express-formidable');
var app = express();
var routes = require('./routes');

// set view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.locals
app.locals.blog = {
  title: "DC Blog"
};

// static files
app.use(express.static(path.join(__dirname, 'public')));

// parsing form data
app.use(formidable());

// route
routes(app);

// start server
app.listen(3000, function () {
  console.log('server listening on port: 3000');
});

