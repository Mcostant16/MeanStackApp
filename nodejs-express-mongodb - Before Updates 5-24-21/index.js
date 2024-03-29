const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var heroController = require('./controllers/heroController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin : 'http://localhost:4200'})); //check to see if correct
//app.use(cors({ origin : 'http://localhost:4200/dashboard'}));

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/heroes', heroController);
