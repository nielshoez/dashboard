const axios = require('axios');
const { db } = require('../models/user');
const User = require ('../models/user');
const { response } = require('express');

const sendGetRequest = async (city) => 
{
  try {
      const responce =  await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=b191e2fd93b6010bd738a846d488705b`);
      if (responce.data.list[0])
        return({"main" : responce.data.list[0].main, "icon": responce.data.list[0].weather[0].icon});
    } catch (error) {
      console.error(error)
    }
};

const getAirQuality = async (city) => 
{
  try {
    const responce =  await axios.get(`https://api.weatherbit.io/v2.0/current/airquality?city=${city}&key=804ad3ce32da43eea1d4aec7b051bbe5`);
    if (responce.data)
      return(responce.data.data[0]);
  } catch (error) {
    console.error(error)
  }
}

const findTable = (userId, tofind) => {
  return User.find({ '_id': userId }, tofind).exec();
}

const getAllCityNameAir = async(userId) => {
  var cityName = [];
  const object = await findTable(userId, 'meteoYearWidgets');
  for (var i in object[0].meteoYearWidgets) {
    cityName.push(object[0].meteoYearWidgets[i].address);
  }
  return(cityName); 
}

const airQualityWidget = async(userId) => {
  var dataCities = [];
  var cityNames = await getAllCityNameAir(userId);
  for (var i in cityNames) {
    if (cityNames[i] != undefined) {
      var apiCall = await getAirQuality(cityNames[i]);
      if (apiCall != undefined) {
        var dataCity = {airQuality: apiCall, cityName : cityNames[i]};
        dataCities.push(dataCity);
      }
    }
  }
  return dataCities;
}

const getAllCityName = async(userId) => {
  var cityName = [];
  const object = await findTable(userId, 'meteoWidgets');
  for (var i in object[0].meteoWidgets) {
    cityName.push(object[0].meteoWidgets[i].address);
  }
  return(cityName); 
}

const meteoLocationWidget = async(userId) => {
  var dataCities = [];
  var cityNames = await getAllCityName(userId);
  for (var i in cityNames) {
    if (cityNames[i] != undefined) {
      var apiCall = await sendGetRequest(cityNames[i]);
      if (apiCall != undefined) {
        var dataCity = {cityWeather: apiCall.main, cityName : cityNames[i], weatherIcon: apiCall.icon};
        dataCities.push(dataCity);
      }
    }
  }
  return dataCities;
}


exports.meteoLocationWidget = meteoLocationWidget;
exports.airQualityWidget = airQualityWidget;