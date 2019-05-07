var request = require('request');
var fs = require('fs');
var MY_TOKEN = require('./secrets').GITHUB_TOKEN;

console.log('Welcome to the GitHub Avatar Downloader!');

function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('error', err => { throw err; })
        .pipe(fs.createWriteStream(filePath))
}

function getRepoContributors(repoOwner, repoName, cb) {
    
    var options = {
        url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + MY_TOKEN
        }
    }

    request(options, function(err, res, body) {
        JSON.parse(body).forEach(record => {
            console.log(record.avatar_url)
        });
        //cb(err, body);
    });

}

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")