const http = require('http');
const fs = require('fs');
const api_key = process.env.REPLICATE_API_KEY;

const download = function(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  
  const request = http.request(url, {
    headers: {
      Authorization: `Token ${api_key}`,
    },
    method: "GET",
    },                 
    function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest, console.log); // Delete the file async. (But we don't check the result)
    // if (cb) cb(err.message);
    console.log(err.message);
  });
};

module.exports = download;