const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const { mongoose } = require('./db.js');
var heroController = require('./controllers/heroController.js');
var allowDomains = ['http://localhost:4200', 'http://192.168.0.21:4200'];
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin : allowDomains})); //check to see if correct
//app.use(cors({ origin : 'http://localhost:4200/dashboard'}));

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/heroes', heroController);
