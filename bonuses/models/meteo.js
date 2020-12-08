const mongoose = require('mongoose');
const MeteoSchema  = new mongoose.Schema({
address :{
    type  : String,
    required : true
},
refreshRate :{
    type  : Number,
    default : 5
},
});
const Meteo= mongoose.model('Meteo',MeteoSchema);

module.exports = Meteo;