// load.js

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function loadDataToMongo(data) {
    console.log("datatatatatatatatat ", data)
    try {
        await client.connect();
        const db = client.db("lab5");
        const collection = db.collection("stocks");
        
        if (Array.isArray(data) && data.length > 0) {
            // Assuming data is an array and we're inserting the first element
            const documentToInsert = data[0];
                    const result = await collection.insertOne(documentToInsert);
        console.log(`Document inserted with ID: ${result.insertedId}`);
        }
    } catch (error) {
        console.error('Failed to load data into MongoDB:', error);
    } finally {
        await client.close();
    }
}

module.exports = { loadDataToMongo };
