/**
	Convert arbitrary binary data to semi-human-readable Braille and back.
*/

// This is the magical lookup table.
var encodechar = (
	"⠀⢀⠠⢠⠐⢐⠰⢰⠈⢈⠨⢨⠘⢘⠸⢸" +
	"⡀⣀⡠⣠⡐⣐⡰⣰⡈⣈⡨⣨⡘⣘⡸⣸" +
	"⠄⢄⠤⢤⠔⢔⠴⢴⠌⢌⠬⢬⠜⢜⠼⢼" +
	"⡄⣄⡤⣤⡔⣔⡴⣴⡌⣌⡬⣬⡜⣜⡼⣼" +
	"⠂⢂⠢⢢⠒⢒⠲⢲⠊⢊⠪⢪⠚⢚⠺⢺" +
	"⡂⣂⡢⣢⡒⣒⡲⣲⡊⣊⡪⣪⡚⣚⡺⣺" +
	"⠆⢆⠦⢦⠖⢖⠶⢶⠎⢎⠮⢮⠞⢞⠾⢾" +
	"⡆⣆⡦⣦⡖⣖⡶⣶⡎⣎⡮⣮⡞⣞⡾⣾" +
	"⠁⢁⠡⢡⠑⢑⠱⢱⠉⢉⠩⢩⠙⢙⠹⢹" +
	"⡁⣁⡡⣡⡑⣑⡱⣱⡉⣉⡩⣩⡙⣙⡹⣹" +
	"⠅⢅⠥⢥⠕⢕⠵⢵⠍⢍⠭⢭⠝⢝⠽⢽" +
	"⡅⣅⡥⣥⡕⣕⡵⣵⡍⣍⡭⣭⡝⣝⡽⣽" +
	"⠃⢃⠣⢣⠓⢓⠳⢳⠋⢋⠫⢫⠛⢛⠻⢻" +
	"⡃⣃⡣⣣⡓⣓⡳⣳⡋⣋⡫⣫⡛⣛⡻⣻" +
	"⠇⢇⠧⢧⠗⢗⠷⢷⠏⢏⠯⢯⠟⢟⠿⢿" +
	"⡇⣇⡧⣧⡗⣗⡷⣷⡏⣏⡯⣯⡟⣟⡿⣿"
).split("");

// Invert it for decoding purposes.
var decodechar = {};
encodechar.forEach(function(ch, i) {
	decodechar[ch] = i;
});

module.exports = {
	encode: function(buf) {
		var str = "";
		for(var b of buf) {
			str += encodechar[b];
		}
		return str;
	},
	
	decode: function(str) {
		var arr = [];
		str.split("").forEach(function(ch) {
			if(!(ch in decodechar)) {
				throw Error("Cannot decode character '" + ch.charCodeAt(0) + "', not Braille.");
			}
			arr.push(decodechar[ch]);
		});
		return new Buffer(arr);
	}
};
