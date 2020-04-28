var MongoClient = require('mongodb').MongoClient;

var handleConnection = function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
}

var connectAndCreate = function(url) {
    MongoClient.connect(url, handleConnection);
}

module.exports = connectAndCreate;