const axios = require('axios');
const { db } = require('../models/user');
const User = require ('../models/user');

const getWordDef = async (word) => 
{

  try {
    const res = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word.toLowerCase()}`, {
    headers: {
        "app_id": "a62b70e3", 
        "app_key": "07a28a6b7c0dbc6ab2164dbf90efcd8a"
    }
    });
    if (res.data != undefined)
        return ({def : res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions, syn: res.data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms})
    } catch (error) {
      console.error(error)
    }
};

const getWordPronunciation = async (word) => 
{

  try {
    const res = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word.toLowerCase()}`, {
    headers: {
        "app_id": "a62b70e3", 
        "app_key": "07a28a6b7c0dbc6ab2164dbf90efcd8a"
    }
    });
    if (res.data != undefined)
        return ({phone : res.data.results[0].lexicalEntries[0].entries[0].pronunciations[1].phoneticSpelling, audio: res.data.results[0].lexicalEntries[0].entries[0].pronunciations[1].audioFile})
    } catch (error) {
      console.error(error)
    }
};

const findTable = (userId, tofind) => {
  return User.find({ '_id': userId }, tofind).exec();
}

const getAllWords = async(userId) => {
  var words = [];
  const object = await findTable(userId, 'OxfordDefinitionWidgets');
  for (var i in object[0].OxfordDefinitionWidgets) {
    words.push(object[0].OxfordDefinitionWidgets[i].Word);
  }
  return(words); 
}

const getAllWordDef = async(userId) => {
  var dataWords = [];
  var words = await getAllWords(userId);
  for (var i in words) {
    if (words[i] != undefined) {
      var apiCall = await getWordDef(words[i]);
      if (apiCall != undefined) {
        var dataCity = {def: apiCall, word : words[i]};
        dataWords.push(dataCity);
      }
    }
  }
  return dataWords;
}

const getAllWordsPron = async(userId) => {
  var words = [];
  const object = await findTable(userId, 'OxfordPronWidgets');
  for (var i in object[0].OxfordPronWidgets) {
    words.push(object[0].OxfordPronWidgets[i].Word);
  }
  return(words); 
}

const getAllWordDefPron = async(userId) => {
  var dataWords = [];
  var words = await getAllWordsPron(userId);
  console.log("in get all word def pron : ",words);
  for (var i in words) {
    if (words[i] != undefined) {
      var apiCall = await getWordPronunciation(words[i]);
      if (apiCall != undefined) {
        var dataCity = {pron: apiCall, word : words[i]};
        dataWords.push(dataCity);
      }
    }
  }
  return dataWords;
}

exports.getAllWordDef = getAllWordDef;
exports.getAllWordDefPron = getAllWordDefPron;
