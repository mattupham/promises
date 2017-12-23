/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var https = require('https');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // (1) return promise holding username
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.slice(0, data.indexOf('\n')));
      }
    });
  })
  // (2) .then - get request, upon completion, will either resolve or reject
  .then((user) => {
    return new Promise((resolve, reject) => {
      console.log('user', user);
      https.get('https://api.github.com/users/' + user, (res) => {
        // console.log('res', res);
        // resolve(res);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          resolve(chunk);
        });
      }).on('error', (e) => {
        reject(new Error({'message': 'Invalid User'}));
      });
    });
  })
  // (3) .then - write request, will either resolve or reject
  .then((data) => {
    console.log('data', data);
    return new Promise((resolve, reject) => {
      fs.writeFile(writeFilePath, data, (err) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve('file written');
        }
      });
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
