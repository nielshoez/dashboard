const mongoose = require('mongoose');
const MeteoYearSchema  = new mongoose.Schema({
address :{
    type  : String,
    required : true
},
refreshRate :{
    type  : Number,
    default : 5
},
date : {
    type: Date,
    required : true
}
});
const MeteoYear= mongoose.model('MeteoYear',MeteoYearSchema);

module.exports = MeteoYear;