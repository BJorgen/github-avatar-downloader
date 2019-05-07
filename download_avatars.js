var request = require('request');
var fs = require('fs');
var MY_TOKEN = require('./secrets').GITHUB_TOKEN;
var repoOwner = process.argv[2];
var repoName = process.argv[3];

// Check the user has input two arguments for owner and repo names.
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
    process.exit();
}

// Welcome message.
console.log('Welcome to the GitHub Avatar Downloader!');


// Copy file given the usl and local file path.
function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('error', err => { throw err; })
        .pipe(fs.createWriteStream(filePath))
}

// Access github API to get a list of contributers given an owner and repo name.
function getRepoContributors(repoOwner, repoName, cb) {
    
    var options = {
        url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + MY_TOKEN
        }
    }

    request(options, function(err, res, body) {
        body = JSON.parse(body);
        // Invoke callback function to loop through contributors names.
        cb(err, body);
    });

}

// Function call to get repo contributors and download their avatar images.
getRepoContributors(repoOwner, repoName, function(err, result) {
    result.forEach(record => {
        downloadImageByURL(record.avatar_url, 'avatars/' + record.login + '.jpg');
    });
});
