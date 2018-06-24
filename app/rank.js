// require express
var express = require('express');

// create our router object
var router = express.Router();

// route for homepage
router.get('/', function(req, res){
	console.log("Got a GET request for the homepage");
	res.render('home',{
		Title : 'Home Page',
	});
});



// export router
module.exports = router;
