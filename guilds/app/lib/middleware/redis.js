const redis = require('redis')
const axios = require('axios')
const client = redis.createClient(6379)

client.on('error', (err) => {
  console.log("Error " + err)
});

//Middleware Function to Check Cache
module.exports = function (req, res, next) {
    let key = "__expIress__" + req.originalUrl || req.url;
    console.log('redis key ', key)
    client.get(key, function(err, reply){
      if(reply){
          replyfixed = reply.replace(/\\/g,'')
          console.log('there is a reply that exists',replyfixed)
          next();
      }else{
        //console.log('there is no reply that exists',body)
          res.sendResponse = res.send;
          res.send = (body) => {
              client.set(key, JSON.stringify(body));
              res.sendResponse(body);
          }
          next();
      }
    });
  };

