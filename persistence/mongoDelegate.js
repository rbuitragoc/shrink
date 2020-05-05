const mongo = require('mongodb').MongoClient;
const {DB_URL} = require('../util/defaults');
const {getNewShrunkId} = require('../util/autoId');

const DATABASE_NAME = 'shrink';
const CLIENT_DATA_TABLE = 'client_data';
const SHRUNK_TABLE = 'shrunk';

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
    const dbInstance = client.db(DATABASE_NAME);
    return await dbInstance.collection(collectionName);
}

const retrieveStats = async function(query) {
    const client = await createClientConnection();
    const coll = await collection(client, CLIENT_DATA_TABLE);
    const results = await coll.find(query).toArray();
    client.close();
    return results;
}

const insertClientData = async function(clientData) {
    const client = await createClientConnection();
    const coll = await collection(client, CLIENT_DATA_TABLE);
    const result = await coll.insertOne(clientData);
    client.close();
    return result;
}

const shrinkAndReturn = async function(source) {
    const client = await createClientConnection();
    const coll = await collection(client, SHRUNK_TABLE);
    const shrunkData = {
        shrunkId: getNewShrunkId(),
        source: source,
    }
    await coll.insertOne(shrunkData);
    client.close();
    return shrunkData.shrunkId;
} 

const updateShrunkEntry = async function(shrunkEntry) {
    const client = await createClientConnection();
    const coll = await collection(client, SHRUNK_TABLE);
    await coll.findOneAndReplace({shrunkId: shrunkEntry.shrunkId}, shrunkEntry);
    client.close();
    return shrunkEntry;
}

const doFindShrunk = async function(query) {
    const client = await createClientConnection();
    const coll = await collection(client, SHRUNK_TABLE);
    const result = await coll.findOne(query);
    client.close();
    
    return result;
}

const findShrunkById = async function (shrunkId) {
    const result = await doFindShrunk({shrunkId: shrunkId});
    return result;
}


// define connector constructor
let MongoConnector = function(url) {
    this.dbUrl = url;
};

let mongoConnector = new MongoConnector(DB_URL);

module.exports = {
    inserClientData: insertClientData,
    findShrunkById: findShrunkById,
    findShrunk: doFindShrunk,
    retrieveStats: retrieveStats,
    shrink: shrinkAndReturn,
    updateShrunkEntry: updateShrunkEntry,
};