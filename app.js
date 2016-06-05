'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./book.model');

var PORT = process.env.PORT || 3000;
var db = 'mongodb://localhost/book';

mongoose.connect(db);

// Start Domain
app.get('/',function(req, res){
	res.send('Awesome mongoDB');
});

// Get all books data
app.get('/books',function(req,res){
	Book.find({}).exec(function(err,books){
		if(err){
			res.send('Error has occured' +err);
		}else{
			res.json(books);
		}
	});
});

// Get Particular book detail
app.get('/books/:id',function(req,res){
	Book.findOne({_id:req.params.id}).exec(function(err, book){
		if(err){
			console.log(err);
		}else{
			res.json(book);
		}
	});
});

app.listen(PORT,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Server running on:" +PORT);
	}
});