var async = require('async');
var http = require('http');

var count = 0;
var currentAnimal = '';

async.whilst(
    function () { return currentAnimal != 'meerkat'; },
    function (callback) {
        count++;
        http.get(process.argv[2], function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk.toString();
            });
            res.on('end', function(chunk){
                currentAnimal = body.trim();
                callback(null, count);
            });
        }).on('error', function(err){
             callback(err);   
        })
    },
    function (err, n) {
        if(err) console.log("error occurred:" + err);
        console.log(n);
    }
);