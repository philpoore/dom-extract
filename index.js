//
// Dom Extract
// philpoore - http://byte22.com - phil@byte22.com
//
// Extract HTML by css selector from FILE or STDIN
//
// Useage:
//   dom-extract $selector [$file]
//
//	$selector 	- html css selector to extract
//  $file		- file to read [optional]
//
//	If $file is ommited, then html is read from STDIN
//
// Examples:
//
//   dom-extract p file.html					: extract all 'p' tags from 'file.html'
//   find *.html | xargs -L 1 dom-extract a		: extract all 'a' tags from '*.html' files
//   cat file.html | dom-extract img			: extract 'img' tags from 'file.html'
//

var fs = require('fs');
var colors = require('colors');
var cheerio = require('cheerio');
var readtoend = require('readtoend');

var selector = process.argv[2];
var filename = process.argv[3];

if (!selector){
	console.log("Selector Required".red);
	process.exit(1);
}

function handle_data(err, data){
	if (err){
		console.log("Error reading file [%s]".red, filename);
		throw err;
	}

	var $ = cheerio.load(data);

	$(selector).each(function (i, el){
		console.log($.html(el));
	});
}

if (filename){
	fs.readFile(filename, handle_data);
}else{
	readtoend.readToEnd(process.stdin, handle_data);
}
