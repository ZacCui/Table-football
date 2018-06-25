var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: Number,
    first_name: { 
        type: String, 
        required: true
    },
    last_name : {
        type: String,
        required: true
    }
});

var matchSchema = new Schema({
    onDate:{
        type: Date,
        required: true
    }, 
    win:{
        type: Number,
        ref: 'User'
    },

    lose:{
        type: Number,
        ref: 'User'
    }
});

var User = mongoose.model('User', userSchema);
var Match = mongoose.model('Match', matchSchema);

module.exports.User = User;
module.exports.Match = Match;