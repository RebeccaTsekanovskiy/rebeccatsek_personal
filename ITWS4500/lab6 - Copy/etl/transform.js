// transform.js

function transformAlphaVantageData(data) {
    console.log("DATAAAAA", data);

    // Assuming 'data' is already in the final format and does not require further extraction
    // from 'Meta Data' or 'Time Series (Daily)' as previously attempted.

    return {
        symbol: data.symbol, // Directly use symbol from the data object
        date: new Date(data.date), // Use date directly from the data object
        open: parseFloat(data.open),
        high: parseFloat(data.high),
        low: parseFloat(data.low),
        close: parseFloat(data.close),
        volume: parseInt(data.volume, 10),
        where: data.source // Assuming 'source' is correctly set in fetched data
    };
}


function transformIEXCloudData(data, symbol) {
    // Assuming the data is already the most recent data point
    return {
        symbol: symbol,
        date: new Date(data.date),
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
        volume: data.volume,
        where: "iexcloud_week"
    };
}

function transformFinancialModelingPrepData(data, symbol) {
    // Assuming 'data' is the most recent data for a stock
    // And the structure is similar to: { date: ..., open: ..., high: ..., ...}
    return {
        symbol: symbol,
        date: new Date(data.date),
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
        volume: data.volume,
        where: "financialmodelingprep_month"
    };
}

module.exports = {
    transformAlphaVantageData,
    transformIEXCloudData,
    transformFinancialModelingPrepData,
};
