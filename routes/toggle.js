var express = require('express');
var router = express.Router();
var mongo = require('../persistence/mongo');
require('dotenv').config();

const performUpdate = async function(shrunkEntry) {
  if (shrunkEntry) {
    if (shrunkEntry.disabled) {
      delete shrunkEntry.disabled;
    } else {
      shrunkEntry.disabled = true;  
    }
    return await mongo.updateShrunkEntry(shrunkEntry);
  }
}

const doToggleReverse = async function(source) {
  let shrunkEntry = await mongo.findShrunk({ source: source });
  return await performUpdate(shrunkEntry);
};

const doToggle = async function(shrunkId) {
  let shrunkEntry = await mongo.findShrunkById(shrunkId);
  return await performUpdate(shrunkEntry);
};

const toggleStatusWrapper = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;
  
  let updated = await doToggle(shrunkId);
  if (updated) {
    res.json(updated);
  } else {
    const msg = 'Cannot toggle ' 
      + process.env.PROTOCOL + '://' 
      + process.env.SHRINK_DOMAIN + '/' 
      + shrunkId + '. Create it first!';
    console.error(msg);
    res.status(404).send(msg);
  }
};

// toggle url enabled/disabled
router.put('/:shrunkId/toggle', toggleStatusWrapper);

module.exports = {
  router: router,
  doToggle: doToggle,
  doToggleReverse: doToggleReverse,
};
