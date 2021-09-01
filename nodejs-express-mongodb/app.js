require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var app = express();
app.use('/api/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: true})); //this fixed everything.
var heroController = require('./controllers/heroController.js');
//middleware
//app.use(bodyParser.json());  // this needs to be updated.
//app.json();
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/uploads', express.static('uploads'));
//error handler
app.use((err , req , res, next) => {
     if (err.name == 'ValidationError') {
         var valErrors = []
         Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
         res.status(422).send(valErrors)
     }
});
//'/api/register'
app.use('/heroes', heroController);
//start server
//192.168.0.21 is the router IP address this has to be included if you want to access it from mobile phone etc on the network.
//if youwant it to be on local host 3000 then just remove it. 
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));




