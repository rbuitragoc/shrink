var express = require('express');
var router = express.Router();
var mongo = require('../persistence/mongo');

const doRetrieveShrunkUrl = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;
  console.log('Received shrunk URL user request for shrunkId: ' + shrunkId);
  const entry = await mongo.findShrunkById(shrunkId);
  const sourceUrl = entry.source;
  console.log('Found a source URL, redirecting to source URL: ' + sourceUrl);
  res.redirect(301, sourceUrl);
}

/* GET redirect to source url */
router.get('/:shrunkId', doRetrieveShrunkUrl);

module.exports = router;
