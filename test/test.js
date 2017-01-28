var brailleEncode = require("../index.js");
var fs = require("fs");
var glob = require("glob");

var pairsDir = "./test/pairs";
glob("./test/pairs/**/*.bin", function(err, files) {
	if(err) {
		throw Error(err);
	}
	files.forEach(function(fileName) {
		var caseName = fileName.substring(0, fileName.length - ".bin".length);
		var binary = fs.readFileSync(caseName + ".bin");
		var text = fs.readFileSync(caseName + ".txt", "utf8");
		console.log(caseName);
		if(!brailleEncode.decode(text).equals(binary)) {
			throw Error("Decode error");
		}
		if(brailleEncode.encode(binary) !== text) {
			throw Error("Encode error");
		}
	});
	console.log("OK");
});
