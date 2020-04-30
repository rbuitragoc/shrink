var express = require('express');
var router = express.Router();
var mongo = require('../persistence/mongo');

const queryAndBuildStats = async function(entry, query) {
  if (entry) { 
    const results = await mongo.retrieveStats(query);
    return {
      source: entry.source,
      id: entry.shrunkId,
      status: entry.disabled ? 'disabled' : 'enabled',
      count: results.length,
      results: results,
    };
  }
}

const doRetrieveStatsReverse = async function(source) {
  const entry = await mongo.findShrunk({ source: source });
  return await queryAndBuildStats(entry, { shrunkId: entry.shrunkId });
}

const doRetrieveStats = async function(shrunkId) {
  const entry = await mongo.findShrunkById(shrunkId);
  return await queryAndBuildStats(entry, { shrunkId: shrunkId });
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
