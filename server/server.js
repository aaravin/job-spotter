var express = require('express');
var morgan = require('morgan');
var session = require('express-session');

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "../client"));

var port = process.env.PORT || 8080;

app.listen(port);
console.log("Listening on PORT " + port);