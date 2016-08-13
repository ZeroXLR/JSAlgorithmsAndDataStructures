'use strict';

module.exports = (function() {
	var ms = require('./mergesort.js'),
		ra = require('./randomarray.js');

	function checkifsorted(array) {
		var i,
			length = array.length;
		for (i = 1; i < length; ++i) {
			if (array[i] < array[i - 1]) {
				return false;
			}
		}
		return true;
	}

	function runningtime() {
		// must keep the arrays local to this function;
		// otherwise, subsequent calls to the function will run our algorithm on already sorted arrays
		var bigarrms = ra(4000000),
			bigarrnative = bigarrms.slice(0);

		console.time('4000000-elements-mstime');
		ms(bigarrms);
		console.timeEnd('4000000-elements-mstime');

		console.time('4000000-elements-nativesorttime');
		bigarrnative.sort(function(a, b) {
			return (a < b)? -1 : (a === b)? 0 : 1;
		});
		console.timeEnd('4000000-elements-nativesorttime');

		return checkifsorted(bigarrms);
	}

	return {
		checkifsorted: checkifsorted,
		runningtime: runningtime
	};
})();
