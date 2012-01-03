/*
 * @copyright 2012 Shiny Lee (liqrliqr [at] gmail.com)
 * @license LGPLv3 http://www.gnu.org/licenses/lgpl-3.0-standalone.html
 */

/**
 * Implement `Object.setPrototypeOf` function to encapsulate `__proto__`.
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/proto#Example
 */
(function(Object){
	if ("function" !== typeof Object.setPrototypeOf) {
		function isPrototypeOf(object) {
			var n, i = object;
			do {
				n = i;
				i = Object.getPrototypeOf(i);
				if (this === i) {
					return true
				}
			} while(i !== n);
			return false
		}

		if ("object" !== typeof "".__proto__) {
			// For any browser which doesn't support __proto__,
			// add/override these functions.

			Object.setPrototypeOf = function(derived, base) {
				for (var i in base) {
					if ( ! derived.hasOwnProperty(i)) {
						derived[i] = base[i]
					}
				}
				derived.__proto__ = base
			};

			Object.getPrototypeOf = function(object) {
				if (object.hasOwnProperty('__proto__')) {
					return object.__proto__
				} else {
					return object.constructor.prototype
				}
			};

			Object.prototype.isPrototypeOf = isPrototypeOf
		} else {
			// Add these functions to old browser which doesn't support them.

			Object.setPrototypeOf = function(derived, base) {
				derived.__proto__ = base
			}

			if ("function" !== typeof Object.getPrototypeOf) {
				Object.getPrototypeOf = function(object) {
					return object.__proto__
				}
			}

			if ("function" !== typeof Object.prototype.isPrototypeOf) {
				Object.prototype.isPrototypeOf = isPrototypeOf
			}
		}
	}
})(Object);
