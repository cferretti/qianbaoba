var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var apiRouter     = require('./api');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wallet');

var app = express();

app.use(bodyParser());
app.use(errorHandler());
app.use('/api', apiRouter);
app.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 6060;
app.listen(port);
console.log('Express app started on port ' + port);

module.exports = app;