/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');
var https = require('https');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.slice(0, data.indexOf('\n')));
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  https.get(url, (res) => {
    console.log('code', res.statusCode);

    callback(null, res.statusCode);

  }).on('error', (e) => {
    callback({'message': 'Invalid URI'}, null);
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
