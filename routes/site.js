var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/sites';

// sample data insert

router.get('/:id/put', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err, '######################## connection error - no MongoDb #######################');
        var sites = db.collection('sites');

        var exists = sites.find({"_id": req.params.id}, {_id: 1}).limit(1);
        if (exists) {
            res.json({'result' : 'already exists'});
        }
        
        sites.insertOne({
                "_id": req.params.id,
                "site_name": "test sample",
                "site_url": "http://www.greecevac-ru.com/Russia/Tracking1.aspx"
            }, function (err, op_result) {
                if (err) {
                    console.log(err);
                }
                res.json({'result' : 'inserted ' + op_result.result.n + 'elements '});
        });
    });
    db.close();
    res.json({'result': 'you should not see this ever'});
});


/* GET all sites. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;

        var cursor = db.collection('sites').find({}, {"site_name" : 1, "site_url" : 1});
        var sites = [];

        cursor.each(function(err, item){
            if(err) throw err;
            if(item == null) {
                db.close(); 
                callback();
                return; 
            }
            sites.push([item.site_name, item.site_url]);
        });

        function callback(){
            res.json(sites);
        }
    });
});


/* GET one site details. */
router.get('/:id/', function(req, res, next) {
    console.log('one site detail\n' + req.params.id);
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;

        var sites = db.collection('sites');

        sites.findOne({"_id" : req.params.id}, {"site_name" : 1, "site_url" : 1}, function(err, cursor){
            if(err) throw err;
            res.json(cursor);
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
