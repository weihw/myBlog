/**
 * Created by weihanwei on 2/8/17.
 */
'use strict';
let pkg = require('./package');
let config = require('config-lite');
let {join} = require('path');
let express = require('express');
let formidable = require('express-formidable');
let app = express();
let routes = require('./routes');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let flash = require('connect-flash');

// set view engine and path
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static files
app.use(express.static(join(__dirname, 'public')));

// session中间件
app.use(session({
  name: config.session.key, // 设置cookie中保存session id 的字段名称
  secret: config.session.secret, // 通过设置secret来计算hash值并放在cookie中，使产生的 signedCookie 放篡改
  cookie: {
    maxAge: config.session.maxAge // 过期时间，过期后 cookie中的session id自动删除
  },
  store: new MongoStore({ //将session存储到mongodb
    url: config.mongodb // mongodb 地址
  })
}));

// parsing form data
app.use(formidable({
  uploadDir: join(__dirname, 'public/img'),
  keepExtensions: true
}));

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

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// route
routes(app);

// start server
app.listen(config.port, function () {
  console.log(`server listening on port: ${config.port}`);
});

