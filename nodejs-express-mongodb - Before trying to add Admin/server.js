var express = require('express');
var app = express();

app.get('/ping', function(req, res) {
    res.send({ping:'hello this is server and I am alive!'});
});

app.get('/ping/:id', function(req, res) {
    res.send({ping:'hello this is server and I am got '+req.params.id});
});

app.listen(3000);
console.log('Listening on port 3000...');