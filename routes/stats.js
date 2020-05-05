const express = require('express');
const router = express.Router();
const mongoDelegate = require('../persistence/mongoDelegate');

const queryAndBuildStats = async function(entry, query) {
  if (entry) { 
    const results = await mongoDelegate.retrieveStats(query);
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
  const entry = await mongoDelegate.findShrunk({ source: source });
  if (entry) {
    return await queryAndBuildStats(entry, { shrunkId: entry.shrunkId });
  }
}

const doRetrieveStats = async function(shrunkId) {
  const entry = await mongoDelegate.findShrunkById(shrunkId);
  return await queryAndBuildStats(entry, { shrunkId: shrunkId });
}

const retrieveStatsWrap = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;
  const stats = await doRetrieveStats(shrunkId);
  if (!stats) {
    res.status(404).send('Shrunk not found, cannot provide stats. Shrink URL first!');
  } else {
    res.json(stats);
  }

};

// GET to retrieve stats!
router.get('/:shrunkId/stats', retrieveStatsWrap);


module.exports = {
  router,
  retrieveStats: doRetrieveStats,
  retrieveStatsReverse: doRetrieveStatsReverse,
};
