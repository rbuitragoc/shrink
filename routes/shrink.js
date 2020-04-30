const express = require('express');
const mongo = require('../persistence/mongo');
let router = express.Router();

const handleRoot = function(req, res, next) {
  res.send("Welcome to Shri.nk! Pass us any URL and we'll shorten it for you");
};

// call delegation impl
const doShorten = async function(source) {
  const shrunkId = await mongo.shrink(source);
  return shrunkId;
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
