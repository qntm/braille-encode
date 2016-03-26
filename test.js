/** Tests for braille-encode, ensure strings survive round trips, etc. */

var brailleEncode = require("./index.js");

// Exhaustively try all single-byte buffers and single-character strings
for(var b = 0; b < 256; b++) {
	var buf1 = new Buffer([b]);
	var str1 = brailleEncode.encode(buf1);
	var buf2 = brailleEncode.decode(str1);
	if(!buf1.equals(buf2)) {
		throw new Error("Bad buffer round trip! " + String(b));
	}
}
for(var cc = 0x2800; cc < 0x2900; cc++) {
	var str1 = String.fromCharCode(cc);
	var buf1 = brailleEncode.decode(str1);
	var str2 = brailleEncode.encode(buf1);
	if(str1 !== str2) {
		throw new Error("Bad string round trip! " + str1);
	}
}

var allCC = "⠀⢀⠠⢠⠐⢐⠰⢰⠈⢈⠨⢨⠘⢘⠸⢸⡀⣀⡠⣠⡐⣐⡰⣰⡈⣈⡨⣨⡘⣘⡸⣸⠄⢄⠤⢤⠔⢔⠴⢴⠌⢌⠬⢬⠜⢜⠼⢼⡄⣄⡤⣤⡔⣔⡴⣴⡌⣌⡬⣬⡜⣜⡼⣼⠂⢂⠢⢢⠒⢒⠲⢲⠊⢊⠪⢪⠚⢚⠺⢺⡂⣂⡢⣢⡒⣒⡲⣲⡊⣊⡪⣪⡚⣚⡺⣺⠆⢆⠦⢦⠖⢖⠶⢶⠎⢎⠮⢮⠞⢞⠾⢾⡆⣆⡦⣦⡖⣖⡶⣶⡎⣎⡮⣮⡞⣞⡾⣾⠁⢁⠡⢡⠑⢑⠱⢱⠉⢉⠩⢩⠙⢙⠹⢹⡁⣁⡡⣡⡑⣑⡱⣱⡉⣉⡩⣩⡙⣙⡹⣹⠅⢅⠥⢥⠕⢕⠵⢵⠍⢍⠭⢭⠝⢝⠽⢽⡅⣅⡥⣥⡕⣕⡵⣵⡍⣍⡭⣭⡝⣝⡽⣽⠃⢃⠣⢣⠓⢓⠳⢳⠋⢋⠫⢫⠛⢛⠻⢻⡃⣃⡣⣣⡓⣓⡳⣳⡋⣋⡫⣫⡛⣛⡻⣻⠇⢇⠧⢧⠗⢗⠷⢷⠏⢏⠯⢯⠟⢟⠿⢿⡇⣇⡧⣧⡗⣗⡷⣷⡏⣏⡯⣯⡟⣟⡿⣿";
var allB = [];
for(var i = 0; i < 256; i++) {
	allB.push(i);
}
allB = new Buffer(allB);

if(!brailleEncode.decode(allCC).equals(allB)) {
	console.log(allB);
	console.log(brailleEncode.decode(allCC));
	throw new Error();
}
if(brailleEncode.encode(allB) !== allCC) {
	throw new Error();
}

// Examples from documentation
if(brailleEncode.encode(new Buffer([0b11110000, 0b01010101])) !== "⡇⣒") { throw new Error(); }
if(brailleEncode.encode(new Buffer([0b11110000, 0b11000011])) !== "⡇⢣") { throw new Error(); }
if(brailleEncode.encode(new Buffer([0b11110000, 0b10100101])) !== "⡇⢕") { throw new Error(); }
if(brailleEncode.encode(new Buffer("hello world")) !== "⠎⢖⠞⠞⢾⠄⣶⢾⡦⠞⠖") { throw new Error(); }

console.log("OK");
