/**
 * 默认配置信息
 * Created by weihanwei on 2017/2/9.
 */
'use strict';
module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
};