var express = require('express');
var router = express.Router();
var mongo = require('../persistence/mongo');

const doRetrieveStatsReverse = async function(source) {
  const query = { source: source };
  const entry = await mongo.findShrunk(query);
  const results = await mongo.retrieveStats({ shrunkId: entry.shrunkId });
  return {
    status: entry.disabled ? 'disabled' : 'enabled',
    count: results.length,
    results: results,
  };
}

const doRetrieveStats = async function(shrunkId) {
  const query = { shrunkId: shrunkId };
  let stats;

  const entry = await mongo.findShrunkById(shrunkId);
  if (entry) {
    const results = await mongo.retrieveStats(query);
    stats = {
      status: entry.disabled ? 'disabled' : 'enabled',
      count: results.length,
      results: results,
    };

  }
  return stats;

}

const retrieveStatsWrap = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;

  // console.log('Received shrunk URL user request for shrunkId: ' + shrunkId);

  const stats = await doRetrieveStats(shrunkId);
  if (!stats) {
    res.status(404).send('Shrunk not found, cannot provide stats. Shrink URL first!');
  } else {
    // console.log('Got results from mongo!!' + results);
    res.json(stats);
  }

};

// GET to retrieve stats!
router.get('/:shrunkId/stats', retrieveStatsWrap);


module.exports = {
  router: router,
  retrieveStats: doRetrieveStats,
  retrieveStatsReverse: doRetrieveStatsReverse,
};
