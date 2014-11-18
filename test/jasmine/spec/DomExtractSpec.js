describe("DomExtract", function() {
	var dom_extract;

	beforeEach(function() {
		dom_extract = require('../../../index.js');
	});

	it('should be an function', function (){
		expect(typeof dom_extract).toBe('function');
	})

	it('should be truthy', function (){
		expect(dom_extract).toBeTruthy();
	})

	it('should throw when ran with no selector', function (){
		function a(){
			dom_extract({}).run()
		}
		expect(a).toThrow();
	});

	it('should expose object', function (){
		var a = dom_extract({selector: 'p'});
		expect(typeof a).toBe('object');
	});

	it('should expose init', function (){
		var a = dom_extract({selector: 'p'});
		expect(a.init).toBeDefined();
	});

	it('should expose init function', function (){
		var a = dom_extract({selector: 'p'});
		expect(typeof a.init).toBe('function');
	});

	it('should expose process', function (){
		var a = dom_extract({selector: 'p'});
		expect(a.process).toBeDefined();
	});

	it('should expose process function', function (){
		var a = dom_extract({selector: 'p'});
		expect(typeof a.process).toBe('function');
	});

	it('should expose run', function (){
		var a = dom_extract({selector: 'p'});
		expect(a.run).toBeDefined();
	});

	it('should expose run function', function (){
		var a = dom_extract({selector: 'p'});
		expect(typeof a.run).toBe('function');
	});

	it('should return "<p>hello</p>" for "<p>hello</p>" input', function (){
		var results = dom_extract({selector: 'p'}).process('<p>hello</p>');
		expect(results[0]).toBe('<p>hello</p>');
	});

	it('should return "hello" for "<p>hello</p>" input when using text', function (){
		var results = dom_extract({
			selector: 'p',
			text: true
		}).process('<p>hello</p>');
		expect(results[0]).toBe('hello');
	});

	it('should return "hello55" for "<i>hello</i>" input when using text', function (){
		var results = dom_extract({
			selector: 'i',
			text: true
		}).process('<i>hello</i>');
		expect(results[0]).toBe('hello');
	});

	it('should return "hello1","hello2" for "<p>hello1</p><p>hello2</p>" input when using text', function (){
		var results = dom_extract({
			selector: 'p',
			text: true
		}).process('<p>hello1</p><p>hello2</p>');
		expect(results[0]).toBe('hello1');
		expect(results[1]).toBe('hello2');
	});
});
