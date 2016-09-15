var express = require('express');
var router = express.Router();
var log = require('../utils/logger');
var toJson = require('../utils/to_json');
var path = require('path');

var sendIndex = function (req, res) {
  log.info('Index Viewed', { context: 'view', user: toJson(req.user) });
  if (FORCE_PRODUCTION || app.get('env') === 'production') {
    res.sendFile(path.resolve(__dirname, '../../client_app/build/bundled/index_yp.html'));
  } else {
    res.sendFile(path.resolve(__dirname, '../../client_app/index_yp.html'));
  }
}

router.get('/', function(req, res) {
  sendIndex(req, res);
});

router.get('/domain*', function(req, res) {
  sendIndex(req, res);
});

router.get('/community*', function(req, res) {
  sendIndex(req, res);
});

router.get('/group*', function(req, res) {
  sendIndex(req, res);
});

router.get('/post*', function(req, res) {
  sendIndex(req, res);
});

router.get('/user*', function(req, res) {
  sendIndex(req, res);
});

module.exports = router;
