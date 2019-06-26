var express = require('express');
var router = express.Router();

/* 用户对首页的访问  （简称接口调用返回） */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
