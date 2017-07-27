const mi 			= require('mediainfo-wrapper');
const http 			= require("https");
const fs 			= require('fs');

//const sourceURL 	= "C:\\Users\\ludov\\Downloads\\progressive.mp4";
const sourceURL 	= 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4'
const tempFileName 	= "temp.mp4";
const file 			= fs.createWriteStream(tempFileName);

var downloadFile = function() {
	return new Promise(function(resolve, reject) {
		http.get(sourceURL, response => {
  			response.pipe(file);
  			response.on('end', function() {
  				resolve();
  			});
		});
	});
}

var extractWidth = function(filePath) {
	mi(filePath).then(function(data) {
    	console.log(JSON.stringify(data[0].video[0].width[0]));
	}).catch(function (e){console.error(e)});
}

var main = function() {
	if (sourceURL.indexOf('http') !== 0) {
		extractWidth(sourceURL);
	} else {
		downloadFile().then(function() {
			extractWidth(__dirname + '/' + tempFileName);
		});
	}
}

main();
