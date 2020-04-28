var express = require('express');
var router = express.Router();

/* GET redirect to source url */
router.get('/:shrunkId', function(req, res, next) {
  console.log('Received shrunk URL user request for shrunkId: ' + req.params.shrunkId);
  res.redirect(301, 'https://www.google.com');
});

module.exports = router;
