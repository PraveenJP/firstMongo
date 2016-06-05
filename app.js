'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./book.model');

var PORT = process.env.PORT || 3000;
var db = 'mongodb://localhost/book';

mongoose.connect(db);

app.get('/',function(req, res){
	console.log('Awesome mongoDB');
});

app.listen(PORT,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Server running on:" +PORT);
	}
});