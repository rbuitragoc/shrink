var express = require('express');


var indexRouter = require('./routes/index');
var shrunkRouter = require('./routes/shrunk');
var statsRouter = require('./routes/stats');

var app = express();
app.use(express.json());

app.use('/', indexRouter);
app.use('/', shrunkRouter);
app.use('/', statsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("Shri.nk URL does not exist or is inactive.");
});

module.exports = app;
