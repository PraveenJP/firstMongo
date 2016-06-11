'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./book.model');

// Port Config
var PORT = process.env.PORT || 3000;

// MongoDB Connection
var db = 'mongodb://localhost/book';
mongoose.connect(db);

// Use Body parser
app.use(bodyParser.json()); // Allow to use json parse element
app.use(bodyParser.urlencoded({ // Allow use to receive the body element through the url
	extended:true
}));

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

// Add Book into the Database
app.post('/books',function(req,res){
	var newBook = new Book();

	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;

	newBook.save(function(err, book){
		if(err){
			res.send('Error savig boos');
		}else{
			res.send(200);
		}
	})
});

// Add book into the database Method 2
app.post('/addBook',function(req,res){
	Book.create(req.body,function(err,book){
		if(err){
			res.send(err);
		}else{
			res.send(book);
		}
	});
});

// Update book in the database
app.put('/books/:id',function(req,res){
	Book.findOneAndUpdate(
		{_id:req.params.id},
		{$set:{title:req.body.title,author:req.body.author,category:req.body.category}},
		{upsert:true},function(err,book){
			if(err){
				res.send(err);
			}else{
				res.send(200);
			}
	});
});

// Delete book from the database
app.delete('/books/:id',function(req,res){
	Book.findOneAndRemove({_id:req.params.id},function(err,book){
		if(err){
			res.send(err);
		}else{
			res.send(200);
		}
	});
});

//Listen Port
app.listen(PORT,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Server running on:" +PORT);
	}
});