// require dependencies

const fs = require('fs');
const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const hbs = require('hbs');
const port = process.env.PORT || 7000;

var app = express();

//use the partial templates 
hbs.registerPartials(__dirname + '/views/partials');

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

//set engine
app.set('view engine', 'hbs');

hbs.registerHelper('currYear', function(){
	return new Date().getFullYear();
});

//mongoose.connect('mongodb://localhost/dvna', {useMongoClient: true});
//mongoose.Promise = global.Promise;

// set up end point
const home = require('./app/rank.js');
app.use('/', home);

// start the server
app.listen(port, function() {
  console.log('app started');
  console.log('running at port' + port);
});