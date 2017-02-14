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

  request(options, function(error, response, body){
    var data = JSON.parse(response.body);
    cb(data);
  });
}

function printURLS(contributors){
  for(i = 0; i < contributors.length; i++){
    console.log(contributors[i]['avatar_url']);
  }
}

getRepoContributors('jquery', 'jquery', printURLS)
