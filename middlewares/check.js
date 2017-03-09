/**
 * 用于检测用户当前是否登录
 * Created by weihanwei on 2017/2/22.
 */
'use strict';
module.exports = {
  checkLogin: (req, res, next) => {
      if(!req.session.user) {
        res.redirect('/signin');
        return
      }
      next();
  },
  checkNotLogin: (req, res, next) => {
    if(req.session.user) {
      res.redirect('/');
      return
    }
    next();
  }
};