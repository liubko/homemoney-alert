const hmAPI = require('./src/hmAPI.js');
const auth = require('./src/auth.js');
const twitterApi = require('./src/twitterAPI.js');
const processData = require('./src/processData.js');

auth.getToken().then(token => {
  return Promise.all([
    hmAPI.getBalance(token),
    hmAPI.getTransactionsForCurrnetMonth(token),
  ]).then(([balance, transactions]) => {
    const currencies = processData.getListOfCurrenciesOutOfBalance(balance);
    const totalExpenses = processData.getTotal(transactions, currencies);

    return {
      totalExpenses,
      defaultCurrency: processData.getDefaultCurrency(currencies),
    };
  }).then(({totalExpenses, defaultCurrency}) => {
    twitterApi.sendMessage(`You spent ${totalExpenses}${defaultCurrency.shortname} this month`);
  }).catch(err => {
    console.log('ERROR', err);
  });
});
