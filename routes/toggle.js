const express = require('express');
const router = express.Router();
const {BASE_URL} = require('../util/defaults');
const mongoDelegate = require('../persistence/mongoDelegate');

const performUpdate = async function(shrunkEntry) {
  if (shrunkEntry) {
    if (shrunkEntry.disabled) {
      delete shrunkEntry.disabled;
    } else {
      shrunkEntry.disabled = true;  
    }
    return await mongoDelegate.updateShrunkEntry(shrunkEntry);
  }
}

const doToggleReverse = async function(source) {
  let shrunkEntry = await mongoDelegate.findShrunk({ source: source });
  return await performUpdate(shrunkEntry);
};

const doToggle = async function(shrunkId) {
  let shrunkEntry = await mongoDelegate.findShrunkById(shrunkId);
  return await performUpdate(shrunkEntry);
};

const toggleStatusWrapper = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;
  
  let updated = await doToggle(shrunkId);
  if (updated) {
    res.json(updated);
  } else {
    const msg = `Cannot toggle ${BASE_URL}${shrunkId}. Create it first!`;
    console.error(msg);
    res.status(404).send(msg);
  }
};

// toggle url enabled/disabled
router.put('/:shrunkId/toggle', toggleStatusWrapper);

module.exports = {
  router,
  doToggle,
  doToggleReverse,
};
