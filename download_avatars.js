var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
    let url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
    
}

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});