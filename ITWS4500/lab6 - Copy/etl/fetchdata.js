const axios = require('axios');
require('dotenv').config();


/*
async function fetchAlphaVantageData(symbol) {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    // Using TIME_SERIES_DAILY for fetching the most recent complete day of data
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log("RESPONSEEEEEEEEE",response)
        // Validate response structure and presence of 'Time Series (Daily)' data
        if (!response.data['Time Series (Daily)']) {
            console.error('Failed to retrieve daily time series data:', response.data);
            throw new Error(`Failed to fetch daily data for ${symbol}: 'Time Series (Daily)' not found in response`);
        }
        const timeSeries = response.data['Time Series (Daily)'];
        const latestDate = Object.keys(timeSeries)[0]; // Retrieves the most recent date
        const latestData = timeSeries[latestDate]; // Retrieves data for the most recent date

        // Prepare and return the formatted data object
        return {
            symbol: symbol,
            date: latestDate,
            open: parseFloat(latestData['1. open']),
            high: parseFloat(latestData['2. high']),
            low: parseFloat(latestData['3. low']),
            close: parseFloat(latestData['4. close']),
            volume: parseInt(latestData['5. volume'], 10),
            source: "Alpha Vantage"
        };
    } catch (error) {
        console.error(`Failed to fetch data from Alpha Vantage for ${symbol}:`, error);
        throw error;
    }
}
*/


async function fetchAlphaVantageData(symbol) {
    const apiToken = '660aab1009b7a5.20187765'; // Consider moving this to a secure place
    const url = `https://eodhd.com/api/eod/${symbol}?api_token=${apiToken}&fmt=json`;

    try {
        const response = await axios.get(url);
        if (response.status === 200 && response.data && response.data.length > 0) {
            const latestData = response.data[0]; // Assuming the first item is the most recent
            const latestDate = latestData.date.split('T')[0]; // Extracting the date part

            return {
                symbol: symbol.replace('.US', ''), // Removing the country code if you want to standardize the symbol format
                date: latestDate,
                open: parseFloat(latestData.open),
                high: parseFloat(latestData.high),
                low: parseFloat(latestData.low),
                close: parseFloat(latestData.close),
                volume: parseInt(latestData.volume, 10),
                source: "EOD Historical Data"
            };
        } else {
            throw new Error(`Failed to fetch EOD data for ${symbol}: Unsuccessful response or no data`);
        }
    } catch (error) {
        console.error(`Error fetching EOD data from EOD Historical Data for ${symbol}:`, error.message);
        throw error;
    }
}




async function fetchIEXCloudData(symbol) {
    const token = process.env.IEX_CLOUD_API_TOKEN;
    // Assuming '5d' gives us the last 5 days for a weekly overview
    const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/5d?token=${token}`;

    try {
        const response = await axios.get(url);
        // Calculating weekly averages
        const weeklyData = response.data.reduce((acc, day) => {
            acc.open += day.open / response.data.length;
            acc.high = Math.max(acc.high, day.high);
            acc.low = Math.min(day.low, acc.low === 0 ? day.low : acc.low);
            acc.close += day.close / response.data.length;
            acc.volume += day.volume;
            return acc;
        }, { open: 0, high: 0, low: 0, close: 0, volume: 0 });

        return {
            symbol: symbol,
            date: response.data[response.data.length - 1].date, // Use the last date of the range
            ...weeklyData,
            volume: weeklyData.volume / response.data.length, // Average volume
            source: "IEX Cloud ----- info for the 5 day span",
        };
    } catch (error) {
        console.error(`Failed to fetch data from IEX Cloud for ${symbol}:`, error);
        throw error;
    }
}

async function fetchFinancialModelingPrepData(symbol) {
    const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
    // Fetching the last month's daily data
    const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=30&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const monthlyData = response.data.historical.slice(0, 30); // Assuming the first 30 are the most recent month's trading days
        // Calculating monthly averages
        const monthlyAverage = monthlyData.reduce((acc, day) => {
            acc.open += day.open / monthlyData.length;
            acc.high = Math.max(acc.high, day.high);
            acc.low = Math.min(day.low, acc.low === 0 ? day.low : acc.low);
            acc.close += day.close / monthlyData.length;
            acc.volume += day.volume;
            return acc;
        }, { open: 0, high: 0, low: 0, close: 0, volume: 0 });

        return {
            symbol: symbol,
            date: monthlyData[0].date, // Use the first date as the month indicator
            ...monthlyAverage,
            volume: monthlyAverage.volume / monthlyData.length, // Average volume
            source: "Financial Modeling Prep-- info for the month",
        };
    } catch (error) {
        console.error(`Failed to fetch data from Financial Modeling Prep for ${symbol}:`, error);
        throw error;
    }
}

module.exports = {
    fetchAlphaVantageData,
    fetchIEXCloudData,
    fetchFinancialModelingPrepData,
};
