/*
The main difference between the waterfall and series functions is that the
result from a task function in async.series won't be passed along to the next
function once it completes. series will collect all results as an array
and pass it to the optional callback that runs once all of the task functions
have completed.

*/

var async = require('async');
var http = require('http');

async.series({
  requestOne : function(done) { makeHttpCall(process.argv[2], done); },
  requestTwo : function(done) { makeHttpCall(process.argv[3], done); }
  }, seriesEndCallback);

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


function seriesEndCallback(err, results){
  if(err) console.log('Error while running series tasks');

  console.log(results);
}
