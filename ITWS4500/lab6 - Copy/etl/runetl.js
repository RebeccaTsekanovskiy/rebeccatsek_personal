const {
    fetchAlphaVantageData,
    fetchIEXCloudData,
    fetchFinancialModelingPrepData,
} = require('./fetchdata.js');

const {
    transformAlphaVantageData,
    transformIEXCloudData,
    transformFinancialModelingPrepData,
} = require('./transform.js');

const { loadDataToMongo } = require('./load.js');


async function runEtlForAlphaVantage(symbol) {
    try {
        const rawData = await fetchAlphaVantageData(symbol); // Remove the 'daily' argument
        const transformedData = transformAlphaVantageData(rawData); // Corrected to match function signature
        await loadDataToMongo([transformedData]); // Ensure data is wrapped in an array
        console.log(`Alpha Vantage ETL for ${symbol} completed successfully.`);
    } catch (error) {
        console.error(`ETL process for Alpha Vantage for ${symbol} failed:`, error);
    }
}

async function runEtlForIEXCloud(symbol) {
    try {
        const rawData = await fetchIEXCloudData(symbol, '1d'); // Correct as-is
        const transformedData = transformIEXCloudData(rawData, symbol); // Corrected to match function signature
        await loadDataToMongo([transformedData]);
        console.log(`IEX Cloud ETL for ${symbol} completed successfully.`);
    } catch (error) {
        console.error(`ETL process for IEX Cloud for ${symbol} failed:`, error);
    }
}

async function runEtlForFinancialModelingPrep(symbol) {
    try {
        const rawData = await fetchFinancialModelingPrepData(symbol); // Remove the 'daily' argument
        const transformedData = transformFinancialModelingPrepData(rawData, symbol); // Corrected to match function signature
        await loadDataToMongo([transformedData]);
        console.log(`Financial Modeling Prep ETL for ${symbol} completed successfully.`);
    } catch (error) {
        console.error(`ETL process for Financial Modeling Prep for ${symbol} failed:`, error);
    }
}

async function runAllEtl() {
    await runEtlForAlphaVantage(symbol);
    await runEtlForIEXCloud(symbol);
    await runEtlForFinancialModelingPrep(symbol);
}

module.exports = {
    runEtlForAlphaVantage,
    runEtlForIEXCloud,
    runEtlForFinancialModelingPrep,
};
