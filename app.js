const express = require('express');
const {BASE_URL} = require('./util/defaults');

const shrunkRouter = require('./routes/shrunk');
const shrinkRouter = require('./routes/shrink').router;
const statsRouter = require('./routes/stats').router;
const toggleRouter = require('./routes/toggle').router;

let app = express();
app.use(express.json());

app.use(shrinkRouter);
app.use(shrunkRouter);
app.use(statsRouter);
app.use(toggleRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send(`The URL does not exist at ${BASE_URL}.`);
});

module.exports = app;
