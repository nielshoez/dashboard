const axios = require('axios');
const { db } = require('../models/user');
const User = require ('../models/user');
const { response } = require('express');

const getCorona = async (country) => 
{
  try {
    const responce =  await axios.get(`https://corona.lmao.ninja/v2/countries/${country}?yesterday&strict&query%20`);
    var res = {flag : responce.data.countryInfo.flag, cases : responce.data.cases, recovered : responce.data.recovered};
    return (res);
    } catch (error) {
      console.error(error)
    }
};

const getCoronaTest = async (country) => 
{
  try {
    const responce =  await axios.get(`https://corona.lmao.ninja/v2/countries/${country}?yesterday&strict&query%20`);
    var res = {flag : responce.data.countryInfo.flag, tests : responce.data.tests, million : responce.data.testsPerOneMillion};
    return (res);
    } catch (error) {
      console.error(error)
    }
};

const findTable = (userId, tofind) => {
  return User.find({ '_id': userId }, tofind).exec();
}

const getAllCountryCorona = async(userId) => {
  var countryName = [];
  const object = await findTable(userId, 'coronaWidgets');
  for (var i in object[0].coronaWidgets) {
    countryName.push(object[0].coronaWidgets[i].address);
  }
  return(countryName); 
}

const getAllCorona = async(userId) => {
  var dataCountries = [];
  var countriesNames = await getAllCountryCorona(userId);
  for (var i in countriesNames) {
    if (countriesNames[i] != undefined) {
      var apiCall = await getCorona(countriesNames[i]);
      if (apiCall != undefined) {
        var dataCity = {corona: apiCall, countryName : countriesNames[i]};
        dataCountries.push(dataCity);
      }
    }
  }
  return dataCountries;
}


const getAllCountryCoronaTest = async(userId) => {
  var countryName = [];
  const object = await findTable(userId, 'coronaWidgetsTest');
  for (var i in object[0].coronaWidgetsTest) {
    countryName.push(object[0].coronaWidgetsTest[i].address);
  }
  return(countryName); 
}

const getAllCoronaTest = async(userId) => {
  var dataCountries = [];
  var countriesNames = await getAllCountryCoronaTest(userId);
  for (var i in countriesNames) {
    if (countriesNames[i] != undefined) {
      var apiCall = await getCoronaTest(countriesNames[i]);
      if (apiCall != undefined) {
        var dataCity = {corona: apiCall, countryName : countriesNames[i]};
        dataCountries.push(dataCity);
      }
    }
  }
  return dataCountries;
}

exports.getAllCorona = getAllCorona;
exports.getAllCoronaTest = getAllCoronaTest;
