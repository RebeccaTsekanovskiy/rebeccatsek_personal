// testTransform.js
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

// Example symbol to fetch and transform data for
const symbol = 'AAPL';

async function testAlphaVantage() {
    console.log('Testing Alpha Vantage Data Transformation');
    const rawData = await fetchAlphaVantageData(symbol);
    const transformedData = transformAlphaVantageData(rawData);
    console.log(transformedData);
}

async function testIEXCloud() {
    console.log('Testing IEX Cloud Data Transformation');
    const rawData = await fetchIEXCloudData(symbol);
    const transformedData = transformIEXCloudData(rawData);
    console.log(transformedData);
}

async function testFinancialModelingPrep() {
    console.log('Testing Financial Modeling Prep Data Transformation');
    const rawData = await fetchFinancialModelingPrepData(symbol);
    const transformedData = transformFinancialModelingPrepData(rawData);
    console.log(transformedData);
}

// Run the tests
testAlphaVantage()
    .catch(err => console.error('Alpha Vantage test failed:', err));

testIEXCloud()
    .catch(err => console.error('IEX Cloud test failed:', err));

testFinancialModelingPrep()
    .catch(err => console.error('Financial Modeling Prep test failed:', err));
