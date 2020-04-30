var express = require('express');
var router = express.Router();
var mongo = require('../persistence/mongo');
require('dotenv').config();

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
  
  // find source URL and perform redirect 
  await mongo.findShrunkById(shrunkId).then((entry) => {
    if (entry) {
      if (entry.disabled) {
        const msg = 'Cannot expand shrunk URL: it has been disabled. Toggle it back on?';
        console.error(msg);
        return res.status(409).send(msg);
      }
      const sourceUrl = entry.source;
      doInsertClientStats(clientData).then(() => { res.redirect(301, sourceUrl) });
    } else {
      const msg = 'Cannot find ' + process.env.PROTOCOL + '://' + process.env.SHRINK_DOMAIN + '/' + shrunkId + '. Please check the link and try again.';
      console.error(msg);
      return res.status(404).send(msg);
    }
  }).catch(e => {
    console.error(e);
  });
};

const doToggleShrunkUrl = async function(req, res, next) {

};

// GET redirect to source url 
router.get('/:shrunkId', doRetrieveShrunkUrl);

module.exports = router;
