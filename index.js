var fs = require('fs');
var cheerio = require('cheerio');
var readtoend = require('readtoend');


var DomExtract = module.exports = function (opts){
	
	var text, selector, filename, extract, single, attr, trim;


	// initalize function
	// can be used to re-init
	var init = function (opts){

		text = opts.text || false;
		attr = opts.attr || false;
		single = opts.single || false;
		trim = opts.trim || false;

		if (opts.selector){
			selector = opts.selector;
		}else{
			extract = opts.extract;
		}
		
		filename = opts.filename;

		// we need a selector
		if (!selector && !extract){
			throw new Error('Selector or Extract required');
		}
	}


	// main function to extract results from data
	// returns results array
	var process_data = function(data){
		var results;
		var $ = cheerio.load(data);

		if (selector){
			results = [];
			$(selector).each(function (i, el){
				var result;
				
				if (text){
					result = $(el).text();
				}else if (attr){
					result = $(el).attr(attr);
				}else{
					result = $.html(el);
				}

				results.push(result);
			});	
		}else{
			var ltext, lselector, lsingle, lattr, ltrim;

			results = {};
			for (i in extract){
				var selector_obj = extract[i];

				if (typeof selector_obj == 'string'){
					lselector = selector_obj;
				}else if (typeof selector_obj == 'object'){
					lselector = typeof selector_obj.selector !== "undefined" ? selector_obj.selector : selector;
					lattr = typeof selector_obj.attr !== "undefined" ? selector_obj.attr : attr;
					ltext = typeof selector_obj.text !== "undefined" ? selector_obj.text : text;
					lsingle = typeof selector_obj.single !== "undefined" ? selector_obj.single : single;
					ltrim = typeof selector_obj.trim !== "undefined" ? selector_obj.trim : trim;
				}

				$(lselector).each(function (j, el){
					var result;
					
					if (ltext){
						result = $(el).text();
					}else if (lattr){
						result = $(el).attr(lattr);
					}else{
						result = $.html(el);
					}
					
					if (ltrim){
						result = result.trim();
					}

					if (lsingle){
						results[i] = result;	
					}else{
						if (!results[i]){
							results[i] = [];
						}

						results[i].push(result);
					}
				});
			}
		}
		
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