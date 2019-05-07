var request = require('request');
var MY_TOKEN = require('./secrets').GITHUB_TOKEN;
console.log(MY_TOKEN);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    
    var options = {
        url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + MY_TOKEN
        }
    }

    request(options, function(err, res, body) {
        cb(err, body);
    });

}

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});