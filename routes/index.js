var express = require('express');
var mongo = require('../persistence/mongo');
var router = express.Router();

const handleIndex = function(req, res, next) {
  res.send("you just hit index page!");
};

const shortenUrl = async function (req, res, next) {
  const body = req.body;
  const shrunkId = await mongo.shrink(body.source);
  res.json({ shrunkId: shrunkId });
};

// GET index
router.get('/', handleIndex);

// POST url to shrink
router.post('/', shortenUrl);

module.exports = router;
