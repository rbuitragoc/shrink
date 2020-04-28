var mongo = require('mongodb').MongoClient;

var handleConnection = function(err, dbConnection) {
    if (err) {
        throw err;
    }
    console.log('Mongo Connection opened successfully');

    
    var dbInstance = dbConnection.db('shrink');
    console.log('Got connection to DB, now using "shrink" DB!');
    var shrunkUrlsCollection = dbInstance.collection('shrunk');
    console.log('Created collection! ' + shrunkUrlsCollection);
    
    var obj = {source: 'http://www.bbc.co.uk', shrunkId: 'amg01'};
    
    shrunkUrlsCollection.insertOne(obj, (err, result) => {
        console.log('wrote ' + obj + ' to collection!');
    });
}

var handleInitialization = function (err, dbc) {
    if (err) {
        throw err;
    }
    dbc.close()    
}

var init = function(url) {
    var connectionProperties = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      };
    mongo.connect(url, connectionProperties, handleInitialization);
}

module.exports = {init: init};