const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://khalaf:khalaf2002@onlinestore.ggfotk8.mongodb.net/?retryWrites=true&w=majority&appName=OnlineStore');
let db;

let connect = async () => {
    try {
        await client.connect();
        db = client.db('onlineStore');
        console.log("connected to mongodb");
        return client;
    } catch (error) {
        throw new Error('Failed to connect to the database: ' + error.message);
    }
};

let getDataBase = () => {
    if (db) {
        return db;
    } else {
        throw new Error('Error during the connection: Database not initialized');
    }
};

module.exports = { connect, getDataBase };
