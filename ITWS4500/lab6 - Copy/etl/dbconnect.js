// dbConnect.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbUri = process.env.MONGODB_URI; // Ensure this is defined in your .env file

// Function to connect to the database
function connectToDb(dbName) {
    return MongoClient.connect(dbUri)
        .then(client => client.db(dbName))
        .catch(error => {
            console.error('Failed to connect to the database', error);
            process.exit(1);
        });
}

// Exporting the function so it can be used elsewhere
module.exports = { connectToDb };
