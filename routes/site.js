var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/sites';

// sample data insert

router.get('/sample', function(req, res, next) {
    console.log('sample data insert\n');
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err, '######################## connection error - no MongoDb #######################');

        var sites = db.collection('sites');

        sites.insertOne({
                "_id": "583d7a456ec7680d20552d4b",
                "site_name": "test sample",
                "site_url": "http://www.greecevac-ru.com/Russia/Tracking1.aspx"
            }, function (err, op_result) {
                if (err) {
                    return console.error(err);
                }
                console.log('inserted:');
		        console.log(op_result.ops[0]);
        });
    });
    res.json({'result': 'successfully added samples'});
});


/* GET all sites. */
router.get('/', function(req, res, next) {
    console.log('all sites list\n');
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;

        var sites = db.collection('sites');

        sites.find().toArray(function(err, cursor){
            if(err) throw err;
            res.send(cursor);
        });
    });
});


/* GET one site details. */
router.get('/:id/', function(req, res, next) {
    console.log('one site detail\n' + req.params.id);
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;

        var sites = db.collection('sites');

        sites.find({"_id" : req.params.id}).toArray(function(err, cursor){
            if(err) throw err;
            res.send(cursor);
        });
    });
});


/* POST some site. */
router.post('/', function(req, res, next) {
    //check if exists
    //then edit
    var sites_list = [
        {
            "site_id": "0",
            "site_name": "Grece",
            "site_url": "http://www.greecevac-ru.com/Russia/Tracking1.aspx"
        }];

    res.json('errcode', '200 OK');
});



module.exports = router;
