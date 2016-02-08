//solution not using async package
/*var fs = require('fs');
var http = require('http');
var fileName = process.argv[2];

fs.readFile(fileName, readFile);


function readFile(err, data) {
  if(err) console.log('error reading file')
  var url = data.toString();
  
  var body = '';
  http.get(url, function(res){
    res.on('data', function(chunk){
      body += chunk.toString();
    });
    
    res.on('end', function(){
      console.log(body);
    });

  }).on('error', function(){
    console.log('Error connecting to:' + url);
  });
  
}*/


//solution with async package
var fs = require('fs')
      , http = require('http')
      , async = require('async');

    var waterfallCallback = function(err, result){
      if (err) return console.error(err);
      console.log(result);
    };  

    async.waterfall([
      function(done){
        fs.readFile(process.argv[2], function(err, data){
          if (err) return done(err);
          done(null, data)
        });
      },

      function(data, done){
        var body = '';
        http.get(data.toString().trimRight(), function(res){
          res.on('data', function(chunk){
            body += chunk.toString();
          });

          res.on('end', function(chunk){
            done(null, body);
          });
        }).on('error', function(e){
          done(e);
        });
      }
    ], waterfallCallback);



