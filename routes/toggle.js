var express = require('express');
var router = express.Router();
var mongo = require('../persistence/mongo');


const doToggleShrunkUrl = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;
  
  let shrunkEntry = await mongo.findShrunkById(shrunkId);
  if (shrunkEntry) {
    if (shrunkEntry.disabled) {
      delete shrunkEntry.disabled;
    } else {
      shrunkEntry.disabled = true;  
    }
    const updated = await mongo.updateShrunkEntry(shrunkEntry);
    res.json(updated);
  } else {
    const msg = 'Cannot toggle http://shri.nk/' + shrunkId + '. Create it first!';
    console.error(msg);
    res.status(404).send(msg);
  }
};

// toggle url enabled/disabled
router.put('/:shrunkId/toggle', doToggleShrunkUrl);

module.exports = router;
