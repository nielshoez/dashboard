const mongoose = require('mongoose');
const WordSchema  = new mongoose.Schema({
Word :{
    type  : String,
    required : true
},

refreshRate :{
    type  : Number,
    default : 5
},
});
const Word= mongoose.model('Word',WordSchema);

module.exports = Word;