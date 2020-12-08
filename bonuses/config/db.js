const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));