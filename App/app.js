const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = "mydb";

async function start() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        
        // Drop products collection before execution
        try {
            await db.collection("products").drop();
            console.log("Products collection dropped");
        } catch (error) {
            console.log("Products collection did not exist");
        }

        const collection = db.collection("products");

        const addProducts = require("./add");
        const readProducts = require("./read");
        const updateProduct = require('./update');
        const removeProduct = require('./remove');

        await addProducts(collection);
        await readProducts(collection);

        await updateProduct(collection);
        await readProducts(collection);

        await removeProduct(collection);
        await readProducts(collection);
    
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

start();