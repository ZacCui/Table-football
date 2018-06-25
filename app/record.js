// require express
var express = require('express');
var ObjectId = require('mongoose').Types.ObjectId; 
var User = require('./schema.js').User;
var Match = require('./schema.js').Match;

// create our router object
var router = express.Router();

// route for homepage
router.get('/', function(req, res){
	console.log("Got a GET request for the homepage");
	res.render('home',{
		Title : 'Home Page',
	});
});

router.post('/', function(req, res){
	console.log("Got a POST request for the homepage");
	var Message = '';
	var flag = false;
	for(var i in req.body){
		if(!req.body[i]){
			flag = true;
			break;
		}
	}
	if(flag){
		Message = 'Please fill all inputs';
	}else if(req.body.win_id === req.body.lose_id){
		Message = 'The Employee id cannot be same';
	}else{
		var winner = new User({
			_id: req.body.win_id,
			first_name: req.body.win_first,
			last_name: req.body.win_last
		});
		var loser = new User({
			_id: req.body.lose_id,
			first_name: req.body.lose_first,
			last_name: req.body.lose_last
		});
		var match = new Match({
			onDate: new Date(),
			win: winner._id,
			lose: loser._id
		});
	
		User.find({_id: winner.id}).then(function(doc){
			console.log(doc);
			if(doc[0] && (doc[0]._id == winner._id)){
				console.log('User already in the database');
			}else{
				winner.save().then(function(doc){
					console.log(JSON.stringify(doc, undefined, 2));
				},function(err){
					console.log('Unable to save the user',err);
				});
			}
			User.find({_id: loser.id}).then(function(doc){
				if(doc[0] && (doc[0]._id == loser._id)){
					console.log('User already in the database');
				}else{
					loser.save().then(function(doc){
						console.log(JSON.stringify(doc, undefined, 2));
					},function(err){
						console.log('Unable to save the user');
					});
				}
				match.save().then(function(doc){
					console.log('match saved successfully');
				}, function(err){
					console.log('Unable to save the match',err);
				});
			},function(err){
				console.log('Loser Find failed', err);
			});
		},function(err){
			console.log('Winner Find failed', err);
		});
	}
	res.render('home',{
		Title : 'Home Page',
		Msg : Message
	});
});

// export router
module.exports = router;
