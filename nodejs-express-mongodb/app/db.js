const mongoose = require('mongoose');
//the corroect db file is in the models folder I believe this is an old one...
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true , useCreateIndex: true}, (err) => { 
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else {console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));}
});

require('./user.model');
require('./profileImages.model');
require('./userNote.model');

module.exports = mongoose;