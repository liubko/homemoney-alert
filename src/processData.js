const CONSTANTS = require("./constants.js");

const getListOfCurrenciesOutOfBalance = data => {
  let res = {};
  data.ListGroupInfo.forEach(group => {
    group.ListAccountInfo.forEach(account => {
      account.ListCurrencyInfo.forEach(currency => {
        res[currency.id] = {
          id: currency.id,
          shortname: currency.shortname,
          rate: currency.rate,
        };
      });
    });
  });

  return res;
};

const getDefaultCurrency = currencies => {
  for (let key in currencies) {
    if (currencies.hasOwnProperty(key)) {
      if (currencies[key].rate === 1) {
        return currencies[key];
      }
    }
  }
};

const getTotal = (transactions, currencies) => {
  let total = 0;
  transactions.forEach(t => {
    if (t.type === CONSTANTS.TYPE_EXPENSE) {
      total += t.Total * currencies[t.CurrencyId].rate;
    }
  });

  return Math.round(total);
};

module.exports = {
  getListOfCurrenciesOutOfBalance,
  getDefaultCurrency,
  getTotal,
};