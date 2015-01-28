var express = require('express');
var request = require('request');
var async = require('async');
var basepath = "http://api.usergrid.com/apigee.certification/sandbox/";

var app = express();
app.get('/:collection', function(req, res) {
	request(basepath + req.params.collection, function(error, response, body) {

		var bodyParsed = JSON.parse(body);
		delete bodyParsed.uri;
		res.json(bodyParsed);
	});
});


/*

You have three request functions that need to be nested in named async functions. Name them as follows:

prooduct
ratings
reviews

Inside each function are the following three requests:

request(basepath + "products/?ql=where product_id='" + req.params.id + "'", function(error, response, body) {
	callback(null, JSON.parse(body).entities[0]);
});

request(basepath + "ratings/?ql=select rating where product_id='" + req.params.id + "'", function(error, response, body) {
	callback(null, JSON.parse(body).list);
});

request(basepath + "reviews/?ql=where product_id='" + req.params.id + "'", function(error, response, body) {
	callback(null, JSON.parse(body).entities);
});

Each of these needs to be written into the async.parallel function in order to produce an appropriate results callback.

Feel free to use google to find appropriate working examples of the syntax

*/

app.get('/products/:id', function(req, res) {




async.parallel(
    products: function(callback) { 
    	request(basepath + "products/?ql=where product_id='" + req.params.id + "'", function(error, response, body) {
	callback(null, JSON.parse(body).entities[0]);
}); 
    },
    ratings: function(callback) { request(basepath + "ratings/?ql=select rating where product_id='" + req.params.id + "'", function(error, response, body) {
	callback(null, JSON.parse(body).list);
}); },
    reviews: function(callback) { request(basepath + "reviews/?ql=where product_id='" + req.params.id + "'", function(error, response, body) {
	callback(null, JSON.parse(body).entities);
}); }


});

app.listen(8000);

//http://api.usergrid.com/apigee.certification/sandbox/products
//http://api.usergrid.com/apigee.certification/sandbox/users