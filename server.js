// require dependencies

const fs = require('fs');
const bodyParser = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const mongo = require('mongodb').MongoClient;
const port = process.env.PORT || 7000;

var app = express();

// connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI ||'mongodb://localhost:27017/test');

// use the partial templates 
hbs.registerPartials(__dirname + '/views/partials');

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// set view engine
app.set('view engine', 'hbs');

hbs.registerHelper('currYear', function(){
	return new Date().getFullYear();
});
// use body parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// set up end point
const home = require('./app/record.js');
const rank = require('./app/rank.js');

app.use('/', home);
app.use('/rank',rank);

// start the server
app.listen(port, function() {
  console.log('app started');
  console.log('running at port' + port);
});