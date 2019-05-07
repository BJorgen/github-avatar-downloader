var request = require('request');
var fs = require('fs');
var MY_TOKEN = require('./secrets').GITHUB_TOKEN;
var repoOwner = process.argv[2];
var repoName = process.argv[3];

if (process.argv.length < 4) {
    console.log(`
------------------------------------------------------------
USER ARGUMENTS NOT FOUND!
------------------------------------------------------------

Try executed from the command line, in the following manner:

        > node download_avatars.js <owner> <repo>
    
Example:
        > node download_avatars.js jquery jquery

------------------------------------------------------------
    `);
    process.exit()
}

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
        body = JSON.parse(body)
        cb(err, body);
    });

}

getRepoContributors(repoOwner, repoName, function(err, result) {
    // console.log("Errors:", err);
    result.forEach(record => {
        downloadImageByURL(record.avatar_url, './avatars/' + record.login + '.jpg')
    });
});

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")