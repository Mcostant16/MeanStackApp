const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/HeroDB';
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err. undefined, 2));
});

module.exports = mongoose;