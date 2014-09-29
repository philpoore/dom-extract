var colors = require('colors');
var cheerio = require('cheerio');
var fs = require('fs');

var selector = process.argv[2];
var filename = process.argv[3];

if (!selector){
	console.log("Selector Required".red);
	return;
}

if (!filename){
	console.log("Filename Required".red);
	return;
}

fs.readFile(filename, function (err, data){
	if (err){
		console.log("Error reading file [%s]".red, filename);
	}

	var $ = cheerio.load(data);
	var els = $(selector);

	els.each(function (i, el){
		console.log($.html(el));
	});
});