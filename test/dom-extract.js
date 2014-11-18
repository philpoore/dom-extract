var dom_extract = require('../index.js');


var results_a = dom_extract({
	selector: 'p'
}).process('<p>hello there</p>');
console.log(results_a);