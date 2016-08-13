'use strict';

// var fs = require('fs');

module.exports = function (n /*, filename*/ ) {
	if (typeof n === 'number' && n === n) {
		var rndarr = [];
		for (var i = 0; i < n; ++i) {
			rndarr.push(Math.random());
		}
		// if (filename && typeof filename === 'string') {
		//    var file = fs.createWriteStream(filename);
		//    file.on('error', function(err) {
		//       console.log(err ? err : 'ok');
		//    });
		//    rndarr.forEach(e => file.write(e + '\n'));
		//    file.end();
		// }
		return rndarr;
	} else {
		throw new SyntaxError("argument should be a valid number");
	}
};
