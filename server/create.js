// Database connection module

const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function getDatabase() {
    await client.connect();

    console.log("Connected to MongoDB");

    return client.db("mydb");
}

module.exports = {
    getDatabase
};