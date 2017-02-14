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
    if(process.argv[2] == null || process.argv[3] == null){
      console.log('INVALID!! Try again with a repoOwner and a repoName');
    }
    else if (process.argv[2] == null && process.argv[3] == null){
      console.log('INVALID!! Try again with a repoOwner and a repoName');
    }
    else{
      var data = JSON.parse(response.body);
      data.forEach(function(profile){
      var avatar_url = profile.avatar_url;
      var dir = "./avatars";     //for creating the filepath
      var filePath = dir + "/" + profile.login + ".jpg";    //for creating filepath
      if(!fs.existsSync(dir)){      //checks to see whether or not the directory exists
        fs.mkdir(dir);
      }
      downloadImageByURL(avatar_url, filePath); //downloads images and stores them according to the described filepath
    });
    cb(data);
    console.log("Download Complete.");
  }

    //var data = JSON.parse(response.body);
    //data.forEach(function(profile){
      //var avatar_url = profile.avatar_url;
      //var dir = "./avatars";     //for creating the filepath
      //var filePath = dir + "/" + profile.login + ".jpg";    //for creating filepath
      //if(!fs.existsSync(dir)){      //checks to see whether or not the directory exists
        //fs.mkdir(dir);
      //}
      //downloadImageByURL(avatar_url, filePath); //downloads images and stores them according to the described filepath
    //})
    //cb(data);
    //console.log("Download Complete.");
  //});
});
}

function printURLS(contributors){              //callback function
  for(i = 0; i < contributors.length; i++){      //iterates through the objects (contributors and their info) and prints out ONLY their avatar url
    console.log(contributors[i]['avatar_url']);

  }
}

function downloadImageByURL(url, filePath) {
  request(url)

  .pipe(fs.createWriteStream(filePath));

  // ...
}

getRepoContributors(process.argv[2], process.argv[3], printURLS)

//if(process.argv[2] == null && process.argv[3] == null){
  //console.log('INVALID!! Try again with a repoOwner and a repoName');
//}
//else{
  //request();
//}
   // Accepts command line arguments
