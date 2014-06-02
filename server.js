var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var apiRouter     = require('./api');
var mongoose = require('mongoose');
var environment = process.env.NODE_ENV || 'dev';

if(environment == 'production'){
	var mongodbUrl = process.env.MONGOHQ_URL;
}else{
	var mongodbUrl = 'mongodb://localhost/wallet';
}

mongoose.connect(mongodbUrl);

var app = express();

app.use(bodyParser());
app.use(errorHandler());
app.use('/api', apiRouter);
app.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 6060;
app.listen(port);
console.log('Express app started on port ' + port);

module.exports = app;