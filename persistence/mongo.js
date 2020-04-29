var mongo = require('mongodb').MongoClient;
require('dotenv').config();
var autoIdUtil = require('../util/autoId');

const retrieveStats = async function(query) {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    const client = await mongo.connect(mongoConnector.dbUrl, options); 
    
    console.log('Mongo Connection opened successfully');

    const dbInstance = client.db('shrink');
    console.log('Got connection to DB, now using "shrink" DB!');

    const coll = await dbInstance.collection('client_data');

    console.log('accessed collection! ' + coll.collectionName);

    const results = await coll.find(query).toArray();

    client.close();
    return results;

}

const insertClientData = async function(clientData) {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    const client = await mongo.connect(mongoConnector.dbUrl, options); 
    
    console.log('Mongo Connection opened successfully');

    const dbInstance = client.db('shrink');
    console.log('Got connection to DB, now using "shrink" DB!');

    const coll = await dbInstance.collection('client_data');

    console.log('accessed collection! ' + coll.collectionName);

    const result = await coll.insertOne(clientData);

    console.log('wrote ' + JSON.stringify(clientData) + ' to collection!;  objectId=' + result.insertedId);

    client.close();
}

const shrinkAndReturn = async function(source) {
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

    const shrunkData = {
        shrunkId: autoIdUtil.getNewShrunkId(),
        source: source,
    }
    const result = await coll.insertOne(shrunkData);

    console.log('wrote ' + JSON.stringify(shrunkData) + ' to collection!;  objectId=' + result.insertedId);

    client.close();
    return shrunkData.shrunkId;

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

    console.log('Found ' + JSON.stringify(result));

    client.close();
    
    return result;
}


// define connector constructor
var MongoConnector = function(url) {
    this.dbUrl = url;
};

var mongoConnector = new MongoConnector(process.env.DB_URL || 'default');

module.exports = {
    inserClientData: insertClientData,
    findShrunkById: findShrunkById,
    retrieveStats: retrieveStats,
    shrink: shrinkAndReturn,
};