/**
 * Created by weihanwei on 2/8/17.
 */
'use strict'
let pkg = require('./package');
let config = require('config-lite');
let path = require('path');
let express = require('express');
let formidable = require('express-formidable');
let app = express();
let routes = require('./routes');

// set view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.locals
app.locals.blog = {
  title: pkg.name,
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
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/img'),
  keepExtensions: true
}));

// route
routes(app);

// start server
app.listen(config.port, function () {
  console.log(`server listening on port: ${config.port}`);
});

