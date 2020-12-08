const mongoose = require('mongoose');
const Meteo = require('./meteo').schema;
const Stock = require('./stock').schema;
const Word = require('./word').schema;
const UserSchema  = new mongoose.Schema({
name :{
    type  : String,
    required : true
} ,
email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,
date :{
    type : Date,
    default : Date.now
},

services : [{
    type: String,
}],

meteoWidgets : [Meteo],
meteoYearWidgets : [Meteo],
coronaWidgets : [Meteo],
coronaWidgetsTest : [Meteo],
StockExchangeWidgets : [Stock],
OxfordDefinitionWidgets : [Word],
OxfordPronWidgets : [Word],
}, { collection : 'users' });
const User= mongoose.model('User',UserSchema);

module.exports = User;