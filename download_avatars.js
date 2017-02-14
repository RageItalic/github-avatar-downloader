var request = require('request');
var fs = require('fs');
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
    data.forEach(function(profile){
      var avatar_url = profile.avatar_url;
      var dir = "./avatars";
      var filePath = dir + "/" + profile.login + ".jpg";
      if(!fs.existsSync(dir)){ //checks to see whether or not the dir exists
        fs.mkdir(dir);
      }
      downloadImageByURL(avatar_url, filePath);
    })
    cb(data);
    console.log("Download Complete.");
  });
}

function printURLS(contributors){
  for(i = 0; i < contributors.length; i++){
    console.log(contributors[i]['avatar_url']);

  }
}

function downloadImageByURL(url, filePath) {
  request(url)

  .pipe(fs.createWriteStream(filePath));

  // ...
}

getRepoContributors(process.argv[2], process.argv[3], printURLS)
