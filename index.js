var express = require('express');
var app = express();

var rx_book = require('./server/rx_book');

var port = process.env.PORT || 3000;

app.use(express.static('./public'));

app.listen(port, function(){
    console.log('Server up: http://localhost:' + port);
});