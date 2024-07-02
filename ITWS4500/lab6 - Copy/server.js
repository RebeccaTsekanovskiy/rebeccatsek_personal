require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const data = require(path.resolve(__dirname, 'project.json'));
const fs = require('fs');
const filePath = path.join(__dirname, 'project.json');


const { runEtlForAlphaVantage } = require('./etl/runetl');
const { runEtlForIEXCloud } = require('./etl/runetl');
const { runEtlForFinancialModelingPrep } = require('./etl/runetl');



const app = express();
app.use(express.static('./test-app/build'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-app/build', 'index.html'));
});


app.get('/api/data', (req, res) => {
    res.json(data);
});




const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


const dbUri = process.env.MONGODB_URI;
let dbCollection;

MongoClient.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        const db = client.db("lab5");
        dbCollection = db.collection("lab5");
        dbCollection_stocks = db.collection("stocks")

        // Start the server inside the .then block
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to the database', error);
        console.log(error);
        process.exit(1);
    });

app.get('/api/stocks/iexcloud', async (req, res) => {
    try {
        const stocks = await dbCollection_stocks.find({ where: "iexcloud_week" }).toArray();
        res.status(200).json(stocks);
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }

});
app.get('/api/stocks', async (req, res) => {
    const data = await dbCollection_stocks.find().toArray();
    res.status(200).json(data);
  });

/*

app.get('/api/stocks/:id', async (req, res) => {
    const get_id = req.params.id;
    if (!ObjectId.isValid(get_id)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }
    const objectId = new ObjectId(get_id);
    console.log(get_id);
    try {
        const stocks = await dbCollection_stocks.find({ _id: objectId }).toArray();
        console.log("stocksssss", stocks);
        res.status(200).json(stocks);
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }

});
*/

app.get('/api/etl/alphaVantage', async (req, res) => {
    const symbol = req.query.symbol 

    try {
        await runEtlForAlphaVantage(symbol);
        res.status(200).json({ message: `ETL process for Alpha Vantage for ${symbol} completed successfully.` });
    } catch (error) {
        console.error(`ETL process for Alpha Vantage for ${symbol} failed:`, error);
        res.status(500).json({ message: `ETL process for Alpha Vantage for ${symbol} failed`, error: error.message });
    }
});
app.get('/api/etl/iexcloud', async (req, res) => {
    const symbol = req.query.symbol 
    try {
        await runEtlForIEXCloud(symbol);
        res.status(200).json({ message: `ETL process for iexcloud for ${symbol} completed successfully.` });
    } catch (error) {
        console.error(`ETL process for Alpha Vantage for ${symbol} failed:`, error);
        res.status(500).json({ message: `ETL process for iexcloud for ${symbol} failed`, error: error.message });
    }
});
app.get('/api/etl/historical', async (req, res) => {
    const symbol = req.query.symbol 
    try {
        await runEtlForFinancialModelingPrep(symbol);
        res.status(200).json({ message: `ETL process for historical  for ${symbol} completed successfully.` });
    } catch (error) {
        console.error(`ETL process for historical for ${symbol} failed:`, error);
        res.status(500).json({ message: `ETL process for historical  for ${symbol} failed`, error: error.message });
    }
});


app.get('/api/stocks/finanicalmodeling', async (req, res) => {
    try {
        const stocks = await dbCollection_stocks.find({ where: "financialmodelingprep_month" }).toArray();
        res.status(200).json(stocks);
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }

});
app.get('/api/stocks/historical', async (req, res) => {
    try {
        const stocks = await dbCollection_stocks.find({ where: "EOD Historical Data" }).toArray();
        res.status(200).json(stocks);
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }

});

app.put('/api/stocks', async (req, res) => {
    const stockUpdate = req.body[0].change;
    const stockFilter = req.body[1].criteria;

    if (!stockUpdate) {
        return res.status(404).send('Stock data needs to be attached to edit.');
    }

    try {
        let query = {};
        if (stockFilter.symbol_match) query.symbol = stockFilter.symbol_match;
        if (stockFilter.date_match) {
            const startDate = new Date(stockFilter.date_match);
            startDate.setUTCHours(0, 0, 0, 0); // Set to start of the day

            const endDate = new Date(stockFilter.date_match);
            endDate.setUTCHours(23, 59, 59, 999); // Set to end of the day

            query.date = { $gte: startDate, $lte: endDate };
        }

        if (Object.keys(query).length === 0) {
            return res.status(401).json('Please put in criteria to match.');
        }

        let queryUpdate = {};
        if (stockUpdate.open) queryUpdate.open = parseFloat(stockUpdate.open);
        if (stockUpdate.high) queryUpdate.high = parseFloat(stockUpdate.high);
        if (stockUpdate.low) queryUpdate.low = parseFloat(stockUpdate.low);
        if (stockUpdate.close) queryUpdate.close = parseFloat(stockUpdate.close);
        if (stockUpdate.volume) queryUpdate.volume = parseInt(stockUpdate.volume, 10);


        const result = await dbCollection_stocks.updateMany(
            query,
            {
                $set: queryUpdate
            },
        );

        if (!result || result.matchedCount === 0) {
            return res.status(404).send('No matching criteria found.');
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.error('Error updating stock data:', error);
        return res.status(500).send('Internal Server Error');
    }
});
app.put('/api/stocks/:id', async (req, res) => {
    const stockUpdate = req.body;
    const documentId = req.params.id;

    if (!ObjectId.isValid(documentId)) {
        return res.status(400).json({ message: 'Invalid ID format.' });
    }

    try {
        const updateResult = await dbCollection_stocks.updateOne(
            { _id: new ObjectId(documentId) },
            { $set: stockUpdate }
        );

        if (updateResult.matchedCount === 0) {
            // No document found with the provided ID.
            return res.status(404).json({ message: "No document found with the provided ID." });
        } else if (updateResult.modifiedCount === 0) {
            // Document exists but no changes were made (data might be the same).
            return res.status(200).json({ message: "Document not modified.", details: updateResult });
        } else {
            // Document successfully updated.
            return res.status(200).json({ message: "Document updated successfully.", details: updateResult });
        }
    } catch (error) {
        console.error('Error updating stock data:', error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


app.post('/api/stocks', async (req, res) => {
    const stock_info = req.body;
    console.log(stock_info);

    // Validate required fields
    if (!stock_info || !stock_info.symbol || !stock_info.date || !stock_info.close) {
        return res.status(400).json({ message: 'Stock information is incomplete.' });
    }
    console.log(stock_info);

    // Validate and convert the date
    const validDate = new Date(stock_info.date);
    if (isNaN(validDate.getTime())) { // Checks if the date is invalid
        return res.status(400).json({ message: 'Invalid date format. Please use YYYY-MM-DD.' });
    }

    try {
        const item = {
            date: validDate, // Using the validated and converted date
            symbol: stock_info.symbol,
            where: stock_info.where,
            high: parseFloat(stock_info.high),
            low: parseFloat(stock_info.low),
            open: parseFloat(stock_info.open),
            close: parseFloat(stock_info.close), // Assuming you have this field
            volume: parseInt(stock_info.volume, 10)
        };

        const result = await dbCollection_stocks.insertOne(item);
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot post stock information.", error: error.message });
    }
});



app.post('/api/stocks/:number', (req, res) => {
    return res.status(400).send('Article can not be added this way.')
});


app.delete('/api/stocks/:id', async (req, res) => {
    const findId = req.params.id;
    console.log(findId); // Corrected variable name for logging
   
    if (!ObjectId.isValid(findId)) {
        console.log("Invalid ID format");
        return res.status(400).json({ message: "Invalid ID format." });
    }

    const objectId = new ObjectId(findId); // Convert string to ObjectId

    try {
        const result = await dbCollection_stocks.findOneAndDelete(
            { _id: objectId } // Corrected to use _id
        );
        
        // findOneAndDelete returns null in 'result.value' if no document matched the query
        if (result) {
            console.log("stock found with ID:", findId);
            return res.json(result)
        } else {
            console.log("Deleted stock:", result.value);
            return res.status(200).json({ message: "Stock deleted successfully.", stock: result.value });
        }
    }
    catch (error) {
        console.error("Error deleting stock information:", error);
        res.status(500).json({ message: "Cannot delete stock information.", error: error.message });
    }
});

app.delete('/api/stocks', async (req, res) => {

    try {
        const result = await dbCollection_stocks.deleteMany({});
        return res.status(200).send({ message: 'All documents deleted successfully', result: result });

    }
    catch (error) {
        console.error('Error deleteing all the documents', error);
        return res.status(500).send('Internal Server Error');

    }

});


app.get('/api/stocks', async (req, res) => {
    try {
        const stocks = await dbCollection_stocks.find({}).toArray();
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});






app.get('/db', async (req, res) => {


    try {
        const documents = await dbCollection.find().toArray();
        res.json(documents);
    }
    catch (error) {
        console.error('Error fetching documents:', error);
        console.log(error); // Log the entire error object
        res.status(500).send('Internal Server Error!!!');
    }

});

app.get('/db/:number', async (req, res) => {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
        return res.status(400).send('Number must be a valid integer');
    }
    try {
        const document = await dbCollection.findOne({ ID: number });

        if (!document) {
            return res.status(404).send('Document not found!');
        }
        res.json(document);
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/db', async (req, res) => {
    const article = req.body;
    if (!article) {
        return res.status(400).send('Article is invalid and can not be posted/.')
    }
    try {
        var item = {
            Title: article.Title,
            Link: article.Link,
            Description: article.Description,
            Date: article.Date,
            Category: article.Category,
            ID: article.ID
        }

        if (item.Title !== undefined &&
            item.Link !== undefined &&
            item.Description !== undefined &&
            item.Date !== undefined &&
            item.Category !== undefined &&
            item.ID !== undefined) {
            dbCollection.insertOne(item);
            return res.json(item);
        }
        else {
            return res.status(400).send('Each form in article must be filled out.')
        }

    }
    catch (error) {
        console.error('Error fetching document', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/db/:number', (req, res) => {
    return res.status(400).send('Article can not be added this way.')
})



app.put('/db/:id', async (req, res) => {
    const article = req.body;
    const article_id = req.params.id;
    try {
        if (!article_id) {
            return res.status(400).send('Article must be sent over.')
        }
        else {
            if (article_id !== req.body.ID) {
                return res.status(405).send('Article ID can not be changed.')
            }

            let query = {};
            if (article.Title !== '') query.Title = article.Title;
            if (article.Link !== '') query.Link = article.Link;
            if (article.Description !== '') query.Description = article.Description;
            if (article.Category !== '') query.Category = article.Category;
            if (article.Date !== '') query.Date = article.Date;



            const result = await dbCollection.findOneAndUpdate(
                { ID: article_id },
                {
                    $set:
                        query
                },
                {
                    returnDocument: 'after'

                }
            );
            if (!result) { // Document not found
                return res.status(404).send('Document not found based on ID number.');
            }
            else {
                return res.status(200).json(result);

            }


        }
    }
    catch (error) {
        console.error('Error fetching document', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/db', async (req, res) => {
    const article_update = req.body[0].change;
    const article_filter = req.body[1].criteria;

    if (!article_update) {
        return res.status(404).send('Document needs to be attached to edit multiple.')
    }


    try {
        let query = {};
        if (article_filter.title_match !== '') query.Title = article_filter.title_match;
        if (article_filter.link_match !== '') query.Link = article_filter.link_match;
        if (article_filter.date_match !== '') query.Date = article_filter.date_match;
        if (article_filter.category_match !== '') query.Category = article_filter.category_match;
        if (article_filter.desc_match !== '') query.Description = article_filter.desc_match;
        if (Object.keys(query).length === 0) {
            return res.status(401).json('Please put in criteria to match');

        }

        let query_update = {};
        if (article_update.Title !== '') query_update.Title = article_update.Title;
        if (article_update.Link !== '') query_update.Link = article_update.Link;
        if (article_update.Description !== '') query_update.Description = article_update.Description;
        if (article_update.Category !== '') query_update.Category = article_update.Category;
        if (article_update.Date !== '') query_update.Date = article_update.Date;


        const result = await dbCollection.updateMany(
            query,

            {
                $set:
                    query_update
            },

        );
        if (!result || result.matchedCount === 0) {
            return res.status(404).send('No criteria to match');
        }
        else {
            return res.status(200).json(result);

        }


    }
    catch (error) {
        console.error('Error fetching document', error);
        return res.status(500).send('Internal Server Error');
    }



});

app.delete('/db/:id', async (req, res) => {
    const del_id = req.params.id;
    if (!del_id) {
        return res.status(404).send('Invalid Article Id', del_id);
    }
    try {
        const result = await dbCollection.findOneAndDelete(
            { "ID": del_id }
        )
        if (!result) {
            return res.status(400).send('No criteria to match');
        }
        else {
            return res.send(result);
        }
    }
    catch (error) {
        console.error('Error fetching document', error);
        return res.status(500).send('Internal Server Error');

    }
});

app.delete('/db', async (req, res) => {

    try {
        const result = await dbCollection.deleteMany({});
        return res.status(200).send({ message: 'All documents deleted successfully', result: result });

    }
    catch (error) {
        console.error('Error deleteing all the documents', error);
        return res.status(500).send('Internal Server Error');

    }

});


app.get('/weatherapi', async (req, res) => {
    try {
        //const { apiRoute } = req.params
        const apiResponse = await fetch(
            'http://api.openweathermap.org/data/2.5/forecast?id=2643743&appid=33e888e4efb30a142b47f982138b6c46&units=imperial');


        const apiResponseJson = await apiResponse.json()
        res.send(apiResponseJson);
    } catch (err) {
        console.log(err)
        res.status(500).send('Something Went Wrong')
    }

});

app.get('/addweatherapi', async (req, res) => {
    try {
        // Retrieve city ID from query parameters
        const cityId = req.query.cityId;

        const apiResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=33e888e4efb30a142b47f982138b6c46&units=imperial`);

        const apiResponseJson = await apiResponse.json();
        res.send(apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something Went Wrong');
    }
});

app.get('/cityweather', async (req, res) => {
    try {
        const cityName = req.query.city; // Get city name from query parameters
        const apiKey = "33e888e4efb30a142b47f982138b6c46";

        const apiResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`);

        const apiResponseJson = await apiResponse.json();
        res.send(apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something Went Wrong');
    }
});


app.post('/generateStarChart', async (req, res) => {
    console.log(req.body);
    const { style, observer, view } = req.body;

    const astronomyApiUrl = "https://api.astronomyapi.com/api/v2/studio/star-chart";
    const apiKey = "22498126-a940-4cf0-857b-3639b2722053"
    // Replace with your API key
    const apiSecret = "2393acea118075a21d9424dc0312493e263e46f1bf2fcf33fb5ec07ca4b37a857f65b6a9aaa643ec75e340952fcd5bbb834f6b1ce40942361acb05d1d46e5d2de58e5eb47fb8ba7ab3c4edf024d66b233b6751429139434b7201fa068c2222571f6b3a302e01cfd359a3a230576f354d"; // Replace with your API secret
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    try {
        const response = await fetch(astronomyApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ style, observer, view })
        });
        const data = await response.json();

        // Send the response back to the client
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching data from Astronomy API.' });
    }
});
app.post('/storeWeatherData', (req, res) => {
    const weatherinfo = req.body;


    if (weatherinfo) {
        const index = data.weatherData.findIndex(item => item.cityName === weatherinfo.cityName);

        if (index === -1) {
            // If the city is not found, add the new weather data
            console.log("city not found");
            data.weatherData.push(weatherinfo);
        } else {
            console.log("city found");
            // If the city is found, update the existing weather data
            data.weatherData[index] = weatherinfo;
        }

        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Data not written!', err);
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.status(201).json({ message: 'Weather data has been updated successfully' });
        });
    } else {
        // If some required fields are missing
        return res.status(400).json({ error: 'Invalid weather data structure' });
    }
});


app.get('/getStoredWeatherData', (req, res) => {
    res.json(data.weatherData);
});


app.put('/editWeatherData', (req, res) => {


    const weatherinfo = req.body;


    if (weatherinfo) {
        const index = data.weatherData.findIndex(item => item.cityName === weatherinfo.cityName);

        if (index === -1) {
            // If the city is not found, add the new weather data
            console.log("city not found");
            data.weatherData.push(weatherinfo);
        } else {
            console.log("city found");
            data.weatherData[index] = weatherinfo;
        }

        // Write the updated data object (including both news and weatherData) back to the project.json file
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Data not written!', err);
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.status(201).json({ message: 'Weather data has been updated successfully' });
        });
    } else {
        // If some required fields are missing
        return res.status(400).json({ error: 'Invalid weather data structure' });
    }
});




app.delete('/deleteweather', (req, res) => {
    const weatherinfo = req.body;
    console.log(req.body);

    if (weatherinfo) {
        // Find the index of the weather record for the city
        const index = data.weatherData.findIndex(item => item.cityName === weatherinfo.cityName);

        if (index === -1) {
            // If the city is not found, send a message back
            console.log("City not found, nothing to delete");
            res.status(404).json({ message: 'City not found, nothing to delete' });
        } else {
            data.weatherData.splice(index, 1);

            fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.error('Data not written!', err);
                    return res.status(500).json({ error: 'Failed to save data' });
                }
                res.status(204).send(); // 204 No Content is appropriate for a successful delete with no response body
            });
        }
    } else {
        // If required fields are missing
        return res.status(400).json({ error: 'Invalid request' });
    }
});





/*

 const Item = require("./models/Article"); // Create the Item model
 app.get("/items", async (req, res) => {
     try {
       const items = await Item.find();
       res.json(items);
     } catch (error) {
       console.error(error);
       res.status(500).send("Server Error");
     }
   });

   */
