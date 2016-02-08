var http = require('http')
  , async = require('async')
  , url = process.argv[2];


async.reduce(['one','two','three'], 0, function(memo, item, callback){
    // pointless async:
    /*process.nextTick(function(){
        callback(null, memo + item)
    });*/

    var body = '';
    http.get(url + "?number=" + item, function(res) {
      res.on('data', function(chunk){
         body += chunk.toString();
      });
      res.on('end', function(chunk){
        var n = Number(body);
        callback(null, memo + n);
      });
    }).on('error', function(err){
      callback(err);
    });




}, function(err, result){
    // result is now equal to the last value of memo, which is 6
    if(err) console.log(err);
    console.log(result);
});  