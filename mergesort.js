'use strict';

module.exports = mergesort;

var check = {
	cmp: function(cmp) {
		return typeof cmp === 'function' && cmp.length === 2;
	},
	bnds: function(arr, start, end) {
		return typeof start === 'number' && typeof end === 'number' && start >= 0 && end < arr.length;
	}
};

var die = function(msg) {
	throw new SyntaxError(msg);
};

var basiccmp = function(a, b) {
	return (a < b)? -1 : (a === b)? 0 : (a > b)? 1 : die("uncomparable value(s) encountered i.e. arguments failed all of less-than, equal to and more-than test!");
}

function mergesort(arr, cmp, start, end) {
	if (arr.constructor === Array) {
		switch (arguments.length) {
			case 1:
				ms(arr.slice(0), arr, basiccmp, 0, arr.length - 1);
				break;
			case 2:
				if (check.cmp(cmp)) {
					ms(arr.slice(0), arr, cmp, 0, arr.length - 1);
				} else {
					die("wrong usage with 2 arguments; valid comparator argument required; aborting ...");
				}
				break;
			case 3:
				if (check.bnds(arr, arguments[1], arguments[2])) {
					ms(arr.slice(0), arr, basiccmp, arguments[1], arguments[2]);
				} else {
					die("wrong usage with 3 arguments; valid start and end indices required; aborting ...");
				}
				break;
			case 4:
				if (check.cmp(cmp) && check.bnds(arr, start, end)) {
					ms(arr.slice(0), arr, cmp, start, end);
				} else {
					die("wrong usage with all arguments; valid comparator, start index and end index required; aborting ...");
				}
				break;
			default:
				die("wrong usage");
		}
	} else {
		die("wrong usage; at least an array argument required; aborting ...");
	}
}

function ms(src, dst, c, s, e) {
	if (s < e) {
		var m = Math.floor((e - s) / 2) + s;
		/* Switch the places of src and dst in the recursive calls below. This eliminates
		 * the need to copy into the auxillary array as we are switching the roles of the
		 * original and the arrays at each recursive depth
		 */
		ms(dst, src, c, s, m);
		ms(dst, src, c, m + 1, e);
		/* So, why does this work? What if dst and src get switched? Well, they don't.
		 * Proof sketch: In the base case, the array is simply a singleton and the entire
		 * ms(...) function does nothing; so, the following fact is trivially true: our
		 * sorting function returns a sorted array, WITHIN ITS SPECIFIED BOUNDS, at its
		 * second argument.
		 * Now, assume the inductive hypothesis that the last two recursive calls to
		 * ms(...) preserve the latter fact - i.e. they each give sorted arrays, within
		 * their respective bounds, at each of their second arguments. The question is,
		 * does the CURRENT call to ms(...) preserve this fact too (within its bounds, of
		 * course, which happens to be the disjoint union of the bounds of the previous
		 * two recursive calls). And indeed it does. This follows from two observations:
		 * 1) the SECOND argument of the previous two recursive calls is actually the
		 * FIRST argument of the current call.
		 * 2) the if-else block below always copies a sorted array to the SECOND argument
		 * of the current call, using the FIRST argument of the same, which was modified
		 * by the previous recursive calls.
		 * Thus, as long as the merge(...) algorithm works correctly and the logic of the
		 * if-else block is sound, the second argument of the current call always gets a
		 * sorted array within the currently specified bounds.
		 */
		if (c(src[m + 1], src[m]) < 0) {
			merge(src, dst, c, s, m, e);
		} else {
			// we only need to copy when merging does not occur
			for (let i = s; i <= e; ++i) dst[i] = src[i];
		}
	}
}

function merge(src, dst, c, s, m, e) {
	// for (var i = s; i <= e; ++i) { // copying array is no longer needed
	// 	aaux[i] = a[i];
	// }
	for (var i = s, j = m + 1, k = s; k <= e; ++k) {
		dst[k] = (i > m)? src[j++]
				:(j > e)? src[i++]
				:(c(src[j], src[i]) < 0)? src[j++]
				: src[i++];
	}
}
