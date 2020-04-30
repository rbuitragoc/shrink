var mongo = require('mongodb').MongoClient;
require('dotenv').config();
var autoIdUtil = require('../util/autoId');

// create client connection
const createClientConnection = async function() {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    return await mongo.connect(mongoConnector.dbUrl, options);
}

// obtain collection object
const collection = async function(client, collectionName) {
    const dbInstance = client.db('shrink');
    return await dbInstance.collection(collectionName);
}

const retrieveStats = async function(query) {
    const client = await createClientConnection();
    const coll = await collection(client, 'client_data');
    const results = await coll.find(query).toArray();
    client.close();
    return results;
}

const insertClientData = async function(clientData) {
    const client = await createClientConnection();
    const coll = await collection(client, 'client_data');
    const result = await coll.insertOne(clientData);
    client.close();
    return result;
}

const shrinkAndReturn = async function(source) {
    const client = await createClientConnection();
    const coll = await collection(client, 'shrunk');
    const shrunkData = {
        shrunkId: autoIdUtil.getNewShrunkId(),
        source: source,
    }
    await coll.insertOne(shrunkData);
    client.close();
    return shrunkData.shrunkId;
} 

const updateShrunkEntry = async function(shrunkEntry) {
    const client = await createClientConnection();
    const coll = await collection(client, 'shrunk');
    await coll.findOneAndReplace({shrunkId: shrunkEntry.shrunkId}, shrunkEntry);
    client.close();
    return shrunkEntry;
}

const doFindShrunk = async function(query) {
    const client = await createClientConnection();
    const coll = await collection(client, 'shrunk');
    const result = await coll.findOne(query);
    client.close();
    
    return result;
}

const findShrunkById = async function (shrunkId) {
    const result = await doFindShrunk({shrunkId: shrunkId});
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
    findShrunk: doFindShrunk,
    retrieveStats: retrieveStats,
    shrink: shrinkAndReturn,
    updateShrunkEntry: updateShrunkEntry,
};