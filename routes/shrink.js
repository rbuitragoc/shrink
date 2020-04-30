const express = require('express');
const mongo = require('../persistence/mongo');
let router = express.Router();

const handleRoot = function(req, res, next) {
  res.send("Welcome to Shrink! Pass us any URL and we'll shorten it for you");
};

// call delegation impl
const doShorten = async function(source) {
  const existingEntry = await mongo.findShrunk({ source: source });
  if (existingEntry) {
    return existingEntry.shrunkId;
  } else {
    return await mongo.shrink(source);
  }
}

// request wrapper impl
const shortenUrl = async function (req, res, next) {
  const body = req.body;
  const shrunkId = await doShorten(body.source);
  res.json({ shrunkId: shrunkId });
};

// GET root route
router.get('/', handleRoot);

// POST url to shrink router
router.post('/', shortenUrl);

module.exports = {
  router: router,
  shrink: doShorten,
};
