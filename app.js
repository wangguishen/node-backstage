// 引入包
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入路由文件
var indexRouter = require('./routes/index');
var router = require('./routes/router');

// 生成 express 实例 
var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 使用包
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 把用户访问导入路由模块
app.use('/', router);


// 生成 404 not found 错误，并且将这个错误交给出错处理函数
app.use(function(req, res, next) {
  next(createError(404));
});

// 处理错误，并且将出错信息显示在页面中
app.use(function(err, req, res, next) {
  // 设置局部变量，只提供开发中的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

// 向外暴露出 express 实例
module.exports = app;
