const axios = require('axios');
const dateHelper = require('./helperDate.js');
const logger = require('./logger.js');

const api = axios.create({
  baseURL: 'https://homemoney.ua/api/api2.asmx/'
});

const handleError = ((msg, error) => {
  logger.info(`[${msg}]`);
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    logger.info(error.response.data);
    logger.info(error.response.status);
    logger.info(error.response.headers);
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.error(`Error ${JSON.stringify(error.message)}`);
  }
  logger.info(error.config);
});

const auth = config => {
  return api.get(`TokenPassword`, {
    params: {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      password: config.password,
      username: config.login,
    }
  }).then(response => {
    return response.data.access_token;
  }).catch(error => {
    handleError('Can\'t get access_token', error);
  });
};

const getTransactionsForCurrnetMonth = token => {
  const [start, end] = dateHelper.getMonthLimits();
  return api.post(`TransactionListByPeriod`, {
    Token: token,
    From: start,
    To: end,
  }).then(response => {
    return response.data.ListTransaction;
  }).catch(error => {
    handleError('Can\'t get transactions for current month', error);
  });
};

const getBalance = token => {
  return api.post(`BalanceList`, {
    Token: token,
  }).then(response => {
    return response.data;
  }).catch(error => {
    handleError('Can\'t get balance list', error);
  });
};

module.exports = {
  api,
  auth,
  getTransactionsForCurrnetMonth,
  getBalance,
};