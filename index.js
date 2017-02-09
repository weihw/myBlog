/**
 * Created by weihanwei on 2/8/17.
 */
var config = require('config-lite');
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
  title: "DC Blog",
  menus: [
    {
      name: "Home",
      link: "/"
    }
  ]
};

// static files
app.use(express.static(path.join(__dirname, 'public')));

// parsing form data
app.use(formidable());

// route
routes(app);

// start server
app.listen(config.port, function () {
  console.log(`server listening on port: ${config.port}`);
});

