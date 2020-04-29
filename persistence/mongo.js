var mongo = require('mongodb').MongoClient;
require('dotenv').config();

const testInsertData = async function() {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    const client = await mongo.connect(mongoConnector.dbUrl, options); 
    
    console.log('Mongo Connection opened successfully');

    const dbInstance = client.db('shrink');
    console.log('Got connection to DB, now using "shrink" DB!');

    const coll = await dbInstance.collection('shrunk');

    console.log('Created collection! ' + coll.collectionName);
        
    const sampleItem = {source: 'http://www.msnbc.com', shrunkId: 'mag96'};

    const result = await coll.insertOne(sampleItem);

    console.log('wrote ' + sampleItem + ' to collection!;  objectId=' + result.insertedId);

    client.close();
}

const findShrunkById = async function (shrunkId) {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    const client = await mongo.connect(mongoConnector.dbUrl, options); 
    console.log('Mongo Connection opened successfully');

    const dbInstance = client.db('shrink');
    console.log('Got connection to DB, now using "shrink" DB!');

    const coll = await dbInstance.collection('shrunk');

    console.log('accessed collection! ' + coll.collectionName);

    const result = await coll.findOne({'shrunkId': shrunkId});

    console.log('Found ' + result.source);

    client.close();
    
    return result;
}


// define connector constructor
var MongoConnector = function(url) {
    this.dbUrl = url;
};

var mongoConnector = new MongoConnector(process.env.DB_URL || 'default');

module.exports = {
    testInsert: testInsertData,
    findShrunkById: findShrunkById
};