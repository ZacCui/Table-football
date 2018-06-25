var express = require('express');
var {ObjectID} = require('mongodb');
var User = require('./schema.js').User;
var Match = require('./schema.js').Match;

// create our router object
var router = express.Router();


// route for homepage
router.get('/', function(req, res){
    console.log("Got a GET request for the rankpage");
    findAllRates().then((table)=>{
        table.sort(function (a, b) {
            return b.win_rate - a.win_rate;
        });
        console.log(table);
        res.render('rank',{
            Title : 'Rank Page',
            Table : table 
        });
    }).catch((e)=>{
        console.log(e.message);
        res.render('home',{
            Title : 'Home Page',
        });
    });

});

const findAllRates = async () => {
    try {
        const lists = await User.find();       
        return await Promise.all(lists.map(async (item) => {
            const rate = await getRate(item._id);
            return {
                'first_name': item.first_name,
                'last_name': item.last_name,
                'win_rate': rate*100 
            };
        }));
    } catch (error) {
        throw new Error('Unable to get all rates ', userId);   
    }
}

const getWins = async (userId) => {
    try {
        const wins = await Match.count({win: userId});
        return wins;
    } catch (e) {
        throw new Error('Unable to get count of wins of ', userId);   
    }
}

const getLoses = async (userId) => {
    try {
        const loses = await Match.count({lose: userId});
        return loses;
    } catch (e) {
        throw new Error('Unable to get count of loses of ', userId);
    }
}

const getRate = async (userId) => {
    try {
        const win_count = await getWins(userId);
        const lose_count = await getLoses(userId);
        let rate = 0;
        rate = (win_count/(win_count+lose_count)).toFixed(2);
        if(isNaN(rate)){
            throw new Error('Invalid Rate value');
        }
        return rate;
    } catch (e) {
        throw new Error('Unable to get Rate ', userId);
    }
};

// export router
module.exports = router;