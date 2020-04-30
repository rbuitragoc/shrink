var express = require('express');


var shrinkRouter = require('./routes/shrink').router;
var shrunkRouter = require('./routes/shrunk');
var statsRouter = require('./routes/stats');
var toggleRouter = require('./routes/toggle');

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
