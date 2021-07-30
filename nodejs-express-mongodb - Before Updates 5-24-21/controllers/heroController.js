const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var ObjectId = require('mongoose').Types.ObjectId;



var { Hero } = require('../models/hero');
// => localhost:3000/heroes
router.get('/', (req, res) => {
    //console.log(req.query.name);
    Hero.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retrieving Employees:' + JSON.stringify(err, undefined,2)); }
    });
});

router.get('/:id', (req, res) => { 
    if(!ObjectId.isValid(req.params.id))
       return res.status(400).send('No record with given id : ${req.params.id}');

    Hero.findById(req.params.id, (err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Retrieving Employee : ' + JSON.stringify(err. undefined, 2)); }
    });
});

router.get('/:id', (req, res) => { 
    if(!ObjectId.isValid(req.params.id))
       return res.status(400).send('No record with given id : ${req.params.id}');

    Hero.findById(req.params.id, (err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Retrieving Employee : ' + JSON.stringify(err. undefined, 2)); }
    });
});

router.get('/search/:id', (req, res) => { 
    //use to search for an employee
    Hero.find( { "name": { "$regex": req.params.id, "$options": "i" } }, (err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Retrieving Employee : ' + JSON.stringify(err. undefined, 2)); }
    });
});


//really weird for some reason it uses the variable heroes as the collection in the database

router.post('/', async(req,res) => { 
   // maxRank = Hero.findById('609e9ba58bc17fa4588f2aa8');
    //in Order to use find you have to include a function that handles err, doc the return resul.
    await Hero.find((err, doc) => {
        if (!err) { maxRank = doc[0].rank + 1; }
        else { console.log('Error in Retrieving Max Rank : ' + JSON.stringify(err. undefined, 2)); }
    }).sort({rank:-1}).limit(1); //this returns the top value for rank.
 
    var heroes = new Hero({ 
        name: req.body.name,
        //rank:   req.body.rank,
        rank: maxRank,
   });
   heroes.save((err, doc) => {
       if (!err) { res.send(doc); }
       else { console.log('Error in Hero Save :' + JSON.stringify(err. undefined, 2));}
   });
});

router.put('/:id', (req,res) => { 
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id');
    
    var hero = {
        name: req.body.name,
        rank: req.body.rank,
    };
    Hero.findByIdAndUpdate(req.params.id, { $set: hero }, {new: true}, (err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Hero Udate : ' + JSON.stringify(err. undefined, 2)); }
    });
});

router.delete('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : $(req.params.id');
    
    Hero.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Hero Delete: ' + JSON.stringify(err. undefined, 2)); }
    });
})


module.exports = router;