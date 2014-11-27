var fs = require('fs');
var cheerio = require('cheerio');
var readtoend = require('readtoend');


var DomExtract = module.exports = function (opts){
	
	var text, selector, filename;


	// initalize function
	// can be used to re-init
	var init = function (opts){
		text = opts.text || false;
		selector = opts.selector;
		filename = opts.filename;

		// we need a selector
		if (!selector){
			throw new Error('Selector required');
		}
	}


	// main function to extract results from data
	// returns results array
	var process_data = function(data){
		var results = [];
		var $ = cheerio.load(data);

		$(selector).each(function (i, el){
			var line = text ? $(el).text() : $.html(el);
			results.push(line);
		});
		return results;
	}


	// handles the input from filename or STDIN
	// starts the process_data function
	// logs the output to STDOUT
	// used with cli / files
	var input_handler = function(err, data){
		if (err){
			console.log("Error reading data".red);
			throw err;
		}

		var results = process_data(data);
		console.log(results.join('\n'));
	}


	// run the dom extract on given filename or STDIN
	// used with cli / files
	var run = function(){
		if (filename){
			fs.readFile(filename, input_handler);
		}else{
			readtoend.readToEnd(process.stdin, input_handler);
		}	
	}

	// initialise with constructor opts
	init(opts);

	// return public methods
	return {
		init: init,				// allow re-init
		process: process_data,	// for use from node.js / js
		run: run				// for use from cli
	}
}
