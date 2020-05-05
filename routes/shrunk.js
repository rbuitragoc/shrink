const express = require('express');
const router = express.Router();
const {BASE_URL} = require('../util/defaults');
const mongoDelegate = require('../persistence/mongoDelegate');

const doInsertClientStats = async function(clientData) {
  // insert client data for stats keeping
  await mongoDelegate.inserClientData(clientData);
};

const doRetrieveShrunkUrl = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;
  const clientData = {
    clientIp: req.ip,
    userAgent: req.get('User-agent'),
    requestDate: new Date().toISOString(),
    shrunkId: shrunkId,
  }
  
  // find source URL and perform redirect 
  await mongoDelegate.findShrunkById(shrunkId).then((entry) => {
    if (entry) {
      if (entry.disabled) {
        const msg = 'Cannot expand shrunk URL: it has been disabled. Toggle it back on?';
        console.error(msg);
        return res.status(409).send(msg);
      }
      const sourceUrl = entry.source;
      doInsertClientStats(clientData).then(() => { res.redirect(301, sourceUrl) });
    } else {
      const msg = `Cannot find ${BASE_URL}${shrunkId}. Please check the link and try again.`;
      console.error(msg);
      return res.status(404).send(msg);
    }
  }).catch(e => {
    console.error(e);
  });
};

// GET redirect to source url 
router.get('/:shrunkId', doRetrieveShrunkUrl);

module.exports = router;
