// testFetchData.js

const { fetchAlphaVantageData, fetchIEXCloudData, fetchFinancialModelingPrepData } = require('./fetchdata.js');

const testSymbol = 'AAPL'; // Example stock symbol

// Test Alpha Vantage
fetchAlphaVantageData(testSymbol)
    .then(data => console.log('Alpha Vantage Data:', data))
    .catch(err => console.error(err));

// Test IEX Cloud


fetchIEXCloudData(testSymbol)
    .then(data => console.log('IEX Cloud Data:', data))
    .catch(err => console.error(err));

    
// Test Financial Modeling Prep
fetchFinancialModelingPrepData(testSymbol)
    .then(data => console.log('Financial Modeling Prep Data:', data))
    .catch(err => console.error(err));
