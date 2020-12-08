const mongoose = require('mongoose');
const StockSchema  = new mongoose.Schema({
From :{
    type  : String,
    required : true
},
To :{
    type  : String,
    required : true
},
refreshRate :{
    type  : Number,
    default : 5
},
});
const Stock= mongoose.model('Stock',StockSchema);

module.exports = Stock;