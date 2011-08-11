var bootstrap = {
	cssRoot: '/_assets/_css/',
	jsRoot:  '/_assets/_js/',
	
	// A set of default files that are included when the browser/os is supported
	defaultFiles: {
		css: [
			'screen',
			'screen-ie6',
			'screen-ie7',
			'screen-ie8',
			'print'
		],
		js: [
			'lib/jquery-1.5.1.min',
			'plugins',
			'config',
			'application'
		]
	},
	
	env: 'development',
	
	disabled: false,
	forced: false
};


(function () {
	// What Browser/Engine and OS is loaded
	var b = bootstrap,
	    a = navigator.userAgent.toLowerCase(),
	    v = navigator.appVersion.toLowerCase();
	b.os = { // OS
		mac: /mac/.test(v),
		win: /win/.test(v),
		lin: /x11/.test(v)
	};
	b.browser = { // Browser/Engine
		version: (a.match(/.+(?:rv|kit|era|ie)[\/: ]([\d.]+)/) || [])[1],
		safari: /webkit/.test(a), // Really it is "webkit" so browsers like Shirra and Konqueror are included in this
		opera: /opera/.test(a),
		msie: /msie/.test(a) && !/opera/.test(a),
		mozilla: /mozilla/.test(a) && !/(compatible|webkit)/.test(a) // Firefox, Camino, etc
	};
	
	
	// The version of the bootstrap file
	b.version = '0.7';
	
	// Tags that go at the end of a requested file
	// Restricts serving that file based on the tags condition
	b.tags = {
		'ie>6': b.browser.msie && parseInt(b.browser.version) > 6,
		'ie6': b.browser.msie && parseInt(b.browser.version) == 6,
		'ie7': b.browser.msie && parseInt(b.browser.version) == 7,
		'ie<8': b.browser.msie && parseInt(b.browser.version) < 8,
		'ie8': b.browser.msie && parseInt(b.browser.version) == 8,
		'ie': b.browser.msie,
		'op': b.browser.opera,
		'kon': b.browser.safari && b.os.lin,
		'sf': b.browser.safari,
		'sfwin': b.browser.safari && b.os.win,
		'mo': b.browser.mozilla,
		'mowin': b.browser.mozilla && b.os.win,
		'momac': b.browser.mozilla && b.os.mac,
		'molin': b.browser.mozilla && b.os.lin
	};
	
	b.mediaTypes = {
		all:		'all',
		aural:		'aural',
		braille:	'braille',
		embossed:	'embossed',
		handheld:	'handheld',
		print:		'print',
		projection:	'projection',
		screen:		'screen',
		tty:		'tty',
		tv:			'tv'
	};
	
		
	// Add a script at runtime only
	b.includeScript = function(path) {
		path = path.replace(/\.js$/, "");
		
		var tag = (path.match(/-(.+)/) || ["", ""])[1];
		if ( (tag in b.tags) && !(b.tags[tag]) ) return;
		
		document.write('<script src="' + b.jsRoot + path + '.js" type="text/javascript" charset="utf-8"><\/script>');
	};
	
	// Add a style at runtime only
	b.includeStyle = function(path, media) {
		path = path.replace(/\.css$/, "");
		media = media || b.mediaTypes[ path.split("/").pop().split("-")[0] ] || 'screen';
		
		var tag = (path.match(/-(.+)/) || ["", ""])[1];
		if ( (tag in b.tags) && !(b.tags[tag]) ) return;
		
		document.write('<link rel="stylesheet" href="' + b.cssRoot + path + '.css" type="text/css" media="' + media + '" charset="utf-8">');
	};
	
	
	// Update paths, default JavaScript files if in production mode
	if (b.env === 'production') {
		if (typeof b.minPath === 'undefined') b.minPath = '_min/';
		b.cssRoot += b.minPath;
		b.jsRoot  += b.minPath;
		b.defaultFiles.js = b.defaultFiles.js.slice(-1);
	}
	
	
	// Only A-Grade and X-Grade Browsers allowed in
	b.supported = !(
		(b.browser.safari && parseInt(b.browser.version) < 419) ||
		(b.browser.msie   && parseInt(b.browser.version) < 6)   ||
		(b.browser.opera  && parseInt(b.browser.version) < 9)
	);
	
	// Is this browser/os supported or is js forced?
	if ((b.supported && !b.disabled) || b.forced) {
		// Get script tag
		var scriptTags = document.getElementsByTagName('script'), scriptTag;
		for (var i=0; i<scriptTags.length; i++)
			if (scriptTags[i].src && scriptTags[i].src.indexOf('bootstrap.js') > 0)
				scriptTag = scriptTags[i];

		var includedFiles = {};
		
		scriptTag.src.split("bootstrap.js?").pop().replace(/(\w+)=([^;]*)/g, function ($0, type, files) {
			includedFiles[type] = b.defaultFiles[type].concat( files ? files.split(",") : [] );
		});
		
		// Include CSS files first
		for (var i=0; i<includedFiles.css.length; i++) {
			b.includeStyle( includedFiles.css[i] );
		}
		
		// Include JavaScript files
		for (var i=0; i<includedFiles.js.length; i++) {
			b.includeScript( includedFiles.js[i] );
		}
	}
})();
