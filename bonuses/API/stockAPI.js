const axios = require('axios');
const { db } = require('../models/user');
const User = require ('../models/user');


const getStock = async (from, to) => 
{
  try {
    const responce =  await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=6BJGEC91Q4CXK1T6`);
    console.log(responce);
    const data = responce.data['Realtime Currency Exchange Rate'];
    if (data != undefined)
      return ({From : data['2. From_Currency Name'], To : data['4. To_Currency Name'], ExchangeRate : data['5. Exchange Rate']});
    } catch (error) {
      console.error(error)
    }
};

const findTable = (userId, tofind) => {
  return User.find({ '_id': userId }, tofind).exec();
}

const getAllCurrencies = async(userId) => {
  var currencies = [];
  const object = await findTable(userId, 'StockExchangeWidgets');
  for (var i in object[0].StockExchangeWidgets) {
    console.log("in get all currencies : ", object[0].StockExchangeWidgets[i]);
    currencies.push({From: object[0].StockExchangeWidgets[i].From, To: object[0].StockExchangeWidgets[i].To});
  }
  return(currencies); 
}

const getAllStock = async(userId) => {
  var dataStock = [];
  var currencies = await getAllCurrencies(userId);
  for (var i in currencies) {
    if (currencies[i] != undefined) {
      var apiCall = await getStock(currencies[i].From, currencies[i].To);
      if (apiCall != undefined) {
        var dataCity = {stock: apiCall, currencies : currencies[i]};
        dataStock.push(dataCity);
      }
    }
  }
  return dataStock;
}

exports.getAllStock = getAllStock;
