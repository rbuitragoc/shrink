var express = require('express');
var router = express.Router();
var mongo = require('../persistence/mongo');

const doRetrieveStatsForShrunkId = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;
  const query = { shrunkId: shrunkId };
  console.log('Received shrunk URL user request for shrunkId: ' + shrunkId);

  const results = await mongo.retrieveStats(query);

  console.log('Got results from mongo!!' + results);
  res.json(results);

};

// GET to retrieve stats!
router.get('/:shrunkId/stats', doRetrieveStatsForShrunkId);


module.exports = router;
