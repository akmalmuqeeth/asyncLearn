/*
With async.each, the results of the asynchronous function are lost.

This is where async.map comes in. It does the same thing as async.each,
by calling an asynchronous iterator function on an array, but collects
the results of the asynchronous iterator function and passes them to the
results callback.

The results are in an array that is in the same order as the original array.

*/

var async = require('async');
var http = require('http');


async.map([process.argv[2], process.argv[3]], makeHttpCall, done);



function makeHttpCall(url, done) {
  var body = '';
  http.get(url, function(res){
      res.on('data', function(chunk){
         body += chunk.toString();
      });
      res.on('end', function(chunk){
        done(null,body);
      });
    }).on('error', function(err) {
      done(err);
    });
}


function done(err, results){
  if(err) console.log(err);
  console.log(results);  
}
