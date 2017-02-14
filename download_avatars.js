var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "RageItalic";
var GITHUB_TOKEN = "1d006c1e51e0de470972e1fc58c5d1b2c481c123";

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'User-Agent': 'request'
  }
};
  // var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request(options, function(error, response, body){
    console.log(body);
  });
}

getRepoContributors('jquery', 'jquery');