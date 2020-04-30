var express = require('express');


var shrunkRouter = require('./routes/shrunk');
var shrinkRouter = require('./routes/shrink').router;
var statsRouter = require('./routes/stats').router;
var toggleRouter = require('./routes/toggle').router;

var app = express();
app.use(express.json());

app.use(shrinkRouter);
app.use(shrunkRouter);
app.use(statsRouter);
app.use(toggleRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("Shri.nk URL does not exist or is inactive.");
});

module.exports = app;
