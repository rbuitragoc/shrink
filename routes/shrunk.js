var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:shrunkId', function(req, res, next) {
  console.log('Received shrunk URL user request for shrunkId: ' + req.params.shrunkId);
  res.send('this should be a redirect to whatever value you set for http://shri.nk/' + req.params.shrunkId);
});

module.exports = router;
