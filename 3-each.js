/*
Occasionally you will want to call the same function multiple times, but with
different inputs, without caring about the return data but to check if any call
throws an error (sometimes not even that).

This is where async.each is useful.

*/

var async = require('async');
var http = require('http');


async.each([process.argv[2], process.argv[3]], makeHttpCall, done);



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


function done(err){
  if(err) console.log(err);  
}
