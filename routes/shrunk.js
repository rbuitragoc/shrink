var express = require('express');
var router = express.Router();
var mongo = require('../persistence/mongo');

const doInsertClientStats = async function(clientData) {
  // insert client data for stats keeping
  await mongo.inserClientData(clientData);
};

const doRetrieveShrunkUrl = async function(req, res, next) {
  const shrunkId = req.params.shrunkId;
  const clientData = {
    clientIp: req.ip,
    userAgent: req.get('User-agent'),
    requestDate: new Date().toISOString(),
    shrunkId: shrunkId,
  }
  console.log('Received shrunk URL user request for shrunkId: ' + shrunkId);
  console.log('Collected client data: ' + JSON.stringify(clientData));
  
  // find source URL and perform redirect 
  await mongo.findShrunkById(shrunkId).then((entry) => {
    if (entry) {
      const sourceUrl = entry.source;
      console.log('Found a source URL, redirecting to source URL: ' + sourceUrl);
      doInsertClientStats(clientData).then(() => { res.redirect(301, sourceUrl) });
    } else {
      const msg = 'Cannot find http://shri.nk/' + shrunkId + '. Please check the link and try again.';
      console.error(msg);
      res.status(404).send(msg);
    }
  }).catch(e => {
    console.error(e);
  });
};

// GET redirect to source url 
router.get('/:shrunkId', doRetrieveShrunkUrl);


module.exports = router;
