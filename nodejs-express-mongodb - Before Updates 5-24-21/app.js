const express = require('express');

const app = express();


//ability to create routes

//How do we start listening to 

app.use('/posts', () => {
	console.log('This is middleware running');
});

app.get('/' , (req,res) => {
	res.send('We are on home');
});

app.get('/posts' , (req,res) => {
	res.send('We are on posts');
});

//How we start listening.  
app.listen(3000);

