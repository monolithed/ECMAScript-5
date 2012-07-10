/**
 * Implementation of ECMAScript 5:
 * Array, String, Object, Date, Function
 * @author: Alexander Guinness
 * @version: 1.1
 * license: MIT
 * @date: Fri Jun 27 17:26:00 2011
 **/


/**
 * Implementation of ECMAScript 5: Array
*/
(function($) {
	/**
	 * @param {mixed} Elements to define is an array
	 * @return {Boolean} Returns true if a variable is an array, false if it is not
	 * @edition ECMA-262 5th Edition, 15.4.3.2
	*/
	if(!Array.isArray) {
		Array.isArray = function(object) {
			return Object.prototype.toString.call(object) === '[object Array]';
		};
	}

	/**
	 * @param {mixed} Element to locate in the array
	 * @return {Number} The first index at which a given element can be found in the array, or -1 if it is not present
	 * @edition ECMA-262 5th Edition, 15.4.4.14
	*/
	if(!$.indexOf) {
		$.indexOf = function(object, from) {
			var length = this.length,
			i = from || 0;
			i = Math[i < 0 ? 'ceil' : 'floor'](i) - 1;

			while(++i <= length) {
				if(i in this && this[i] === object)
					return i;
			}
			return -1;
		};
	}

	/**
	 * @param {Function} fn is Callback-function
	 * @param {Object} Object to use as this when executing callback
	 * @link {forEach}
	 * @edition ECMA-262 5th Edition, 15.4.4.16
	 * @return {Boolean} Tests whether all elements in the array pass the test implemented by the provided function
	*/
	if(!$.every) {
		$.every = function(fn, object) {
			var length = this.length, i = -1;
			while(++i < length) {
				if(i in this && !fn.call(object, this[i], i, this))
					return false;
			}
			return true;
		};
	}

	/**
	 * @param {Function} fn is Callback-function
	 * @param {Object} Object to use as this when executing callback
	 * @link {forEach}
	 * @edition ECMA-262 5th Edition, 15.4.4.17
	 * @return {Boolean} Tests whether some element in the array passes the test implemented by the provided function
	*/
	if(!$.some) {
		$.some = function(fn, object) {
			var length = this.length, i = -1;
			while(i++ < length) {
				if(i in this && fn.call(object, this[i], i, this))
					return true;
			}
			return false;
		};
	}

	/**
	 * @param {Function} fn is Callback-function
	 * @param {Object} Object to use as this when executing callback
	 * @return {Array} Executes a provided function once per array element
	 * @edition ECMA-262 5th Edition, 15.4.4.18
	*/
	if(!$.forEach) {
		$.forEach = function(fn, object) {
			var length = this.length, i = -1;
			while(i++ < length) {
				if(this.hasOwnProperty(i))
					fn.call(object, this[i], i, this);
			 }
		};
	}

	/**
	 * @param {Function} fn is Callback-function
	 * @param {Object} Object to use as this when executing callback
	 * @link {forEach}
	 * @return {Array} Creates a new array with the results of calling a provided function on every element in this array
	 * @edition ECMA-262 5th Edition, 15.4.4.19
	*/
	if(!$.map) {
		$.map = function(fn, object) {
			var i = -1, length = this.length, array = [];
			while(i++ < length) {
				if(i in this)
					array.push(fn.call(object, this[i], i, this));
			}
			return array;
		};
	}

	/**
	 * @param {Function} fn is Callback-function
	 * @param {Object} Object to use as this when executing callback
	 * @link {forEach}
	 * @return {Array} Creates a new array with all elements that pass the test implemented by the provided function
	 * @edition ECMA-262 5th Edition, 15.4.4.20
	*/
	if(!$.filter) {
		$.filter = function(fn, object) {
			var length = this.length, array = [], i = -1;
			while(i++ < length) {
				if(i in this && fn.call(object, this[i], i, this))
					array.push(this[i]);
			}
			return array;
		};
	}

	/**
	 * @param {Function} fn is Callback-function
	 * @param {mixed} init Initial value
	 * @return {mixed} Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
	 * @edition ECMA-262 5th Edition, 15.4.4.21
	*/
	if(!$.reduce) {
		$.reduce = function(fn, init) {
			var length = this.length, i = -1;
			if(arguments.length < 2) {
				while(i++ < length) {
					if(i in this) {
						init = this[i];
						break;
					}
				}
			}
			while(i++ < length) {
				if(i in this)
					init = fn(init, this[i], i, this);
			}
			return init;
		}
	}

	/**
	 * @param {Function} fn is Callback-function
	 * @param {mixed} init Initial value
	 * @return {mixed} Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value.
	 * @edition ECMA-262 5th Edition, 15.4.4.22
	*/
	if(!$.reduceRight) {
		$.reduceRight = function(fn, init) {
			var i = this.length;
			if(arguments.length < 2) {
				while(i--) {
					if(i in this) {
						init = this[i];
						break;
					}
				}
			}
			while(i--) {
				if(i in this)
					init = fn(init, this[i], i, this);
			}
			return init;
		}
	}
})(Array.prototype);


/**
 * Implementation of ECMAScript 5: Date
*/
(function(date) {
	/**
	 * Date.prototype.toISOString ( )
	 * This function returns a String value represent the instance in time
	 * represented by this Date object Date Time string format defined in 15.9.1.15.
	 * All fields are present in the String. The time zone is always UTC, denoted by the
	 * suffix Z. If the time value of this object is not a finite Number a RangeError exception is thrown.
	 * @edition: ECMA-262 5th Edition, 15.9.5.43
	 * @return {String} string in ISO format, the ISO 8601 Extended Format
	 * @author: Alexander Guinness
	 * @version: 1.0
	 * @license: MIT
	 *
	 * Example:
	 * var today = new Date('05 October 2011 14:48 UTC');
	 * console.log(today.toISOString());
	 * //2011-10-10T14:48:00.000Z
	*/
	if(!date.toISOString) {
		date.toISOString = function() {
			if (!isFinite(this))
				throw new RangeError('Date.prototype.toISOString called on non-finite value.');

			return (function() {
				var length = arguments.length,
					result = [],
					divide = ['-', '-', 'T', ':', ':', '.', 'Z'],
					i = -1, attr, item;

				while(++i < length) {
					attr = arguments[i];
					item = attr.toString().length;

					result.push((
						i < length - 1 ? attr < 10 ? '0' + attr : attr
						: item < 2 ? '00' + attr : item < 3 ? '0' + attr
						: 3 < item ? attr / Math.pow(10, l - 3) | 0 : attr) + divide[i]
					);
				}
				return result.join('');
			}(
				this.getUTCFullYear(),
				(this.getUTCMonth() + 1),
				this.getUTCDate(),
				this.getUTCHours(),
				this.getUTCMinutes(),
				this.getUTCSeconds(),
				this.getUTCMilliseconds()
			));
		};
	}

	/**
	 * Date.now ( )
	 * The now function returns a Number value that is the time value designating
	 * the UTC date and time of the occurrence of the call to now.
	 * @edition: ECMA-262 5th Edition, 15.9.4.4
	 * @return {Number} The number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
	 * @author: Alexander Guinness
	 * @version: 1.0
	 * @license: MIT
	 *
	 * Example:
	 * console.log(Date.now());
	 * //1332042247766
	*/
	if(!Date.now) {
		Date.now = function () {
			return +new Date();
		};
	}

	/**
	 * Date.prototype.toJSON ( key )
	 * This function provides a String representation of a Date object for use by JSON.stringify
	 * @edition: ECMA-262 5th Edition, 15.9.5.44
	 * @return {JSON} A JSON representation of the Date object
	 * @author: Alexander Guinness
	 * @version: 1.0
	 * @license: MIT
	 *
	 * Example:
	 * console.log((new Date()).toJSON())
	 * //2012-03-18T03:47:38.087Z
	*/
	if(!date.toJSON) {
		Date.prototype.toJSON = function (key) {
			if (typeof this.toISOString != 'function')
				throw new TypeError();
			return this.toISOString();
		};
	}
}(Date.prototype));


/**
 * Implementation of ECMAScript 5: Object
*/
(function(type) {
	/**
	 * Object.getPrototypeOf ( Object )
	 * @param {Object} The object whose prototype is to be returned
	 * @return: The prototype of the specified object
	 * @edition ECMA-262 5th Edition, 15.2.3.2
	 *
	 * Example:
	 * Object.getPrototypeOf(document.childNodes) === NodeList.prototype //true
	*/
	if(!Object.getPrototypeOf) {
		Object.getPrototypeOf = function (object) {
			if (type.call(object) !== '[object Object]')
				throw new TypeError('Object.getPrototypeOf'.concat(': ', object.toString(), ' is not an Object'));

			return object.__proto__ || object.constructor.prototype;
		};
	}

	/**
	 * Object.getOwnPropertyNames ( Object )
	 * @param {Object} The object whose prototype is to be returned
	 * @link {Object.keys}
	 * @return: The object whose enumerable and non-enumerable own properties are to be returned
	 * @edition ECMA-262 5th Edition, 15.2.3.4
	 *
	 * Example:
	 * Object.getOwnPropertyNames(alert)
	 * //["length", "name", "arguments", "caller"]
	*/
	if(!Object.getOwnPropertyNames) {
		Object.getOwnPropertyNames = function (object) {
			if (Object.prototype.toString.call(object) !== '[object Object]')
				throw new TypeError('Object.getOwnPropertyNames'.concat(': ', object.toString(), ' is not an Object'));
			return Object.keys(object);
		};
	}

	/**
	 * Object.create(Object object [, properties Properties ]).
	 * Creates a new object with the specified prototype object and properties.
	 * @param {Object} object - The object whose prototype is to be returned
	 * @include: Object.defineProperties
	 * @param {Object} properties - If specified and not undefined, an object whose enumerable own properties
	 * (that is, those properties defined upon itself and not enumerable properties along its
	 * prototype chain) specify property descriptors to be added to the newly-created object,
	 * with the corresponding property names
	 * @link {Object.keys}
	 * @return: Object
	 * @edition ECMA-262 5th Edition, 15.2.3.5
	 *
	 * NOTE: This is not a complete implementation!
	 * No checks for enumerable properties.
	 *
	 * Example:
	 * Object.create({}, { object: { value: 1 } });
	 * Object.create(null).constructor; //undefined
	*/

	if(!Object.create) {
		Object.create = function(object, properties) {
			if (typeof object !== 'object')
				throw new TypeError('Object.create'.concat(': ', object.toString(), ' is not an Object or Null'));

			var __new__ = function() {};
			__new__.prototype = object;
			var init = new __new__();

			if ('__proto__' in init)
				init.__proto__ = object;

			if (Object.defineProperties && properties)
				Object.defineProperties(init, properties);

			return init;
		};
	}

	/**
	 * Object.defineProperty ( Object object, String property, Object attributes)
	 * The defineProperty function is used to add an own property and/or update
	 * the attributes of an existing own property of an object.
	 * @param {Object} The object on which to define the property
	 * @param {String} The name of the property to be defined or modified
	 * @param {Object} The descriptor for the property being defined or modified
	 * @link {Object.defineProperties}
	 * @return: Object
	 * @edition ECMA-262 5th Edition, 15.2.3.6
	 *
	 * NOTE: This is not a complete implementation!
	 *
	 * Example:
	 * Object.defineProperty({}, '1', { value: {a: 1}});
	*/
	if(!Object.defineProperty && Object.prototype.__defineGetter__) {
		Object.defineProperty = function(object, property, attributes) {
			if (type.call(object) !== '[object Object]' && type.call(attributes) !== '[object Object]' && typeof property !== 'string')
				throw new TypeError('Object.defineProperty ( Object object, String property, Object attributes)');

			if(Object.prototype.hasOwnProperty.call(attributes, 'value')) {
				if(!object.__lookupGetter__(property) && !object.__lookupSetter__(property))
					object[property] = attributes.value;
			}
			else {
				if(attributes.get)
					object.__defineGetter__(property, attributes.get);

				if(attributes.set)
					object.__defineSetter__(property, attributes.set);
			}
			return object;
		}
	}

	/**
	 * Object.defineProperties ( Object object, properties Object )
	 * The defineProperties function is used to add own properties and/or update
	 * the attributes of existing own properties of an object.
	 * @param {Object} The object on which to define or modify properties
	 * @param {Object} An object whose own enumerable properties constitute
	 * descriptors for the properties to be defined or modified
	 * @link {Object.defineProperty}
	 * @return: Object
	 * @edition ECMA-262 5th Edition, 15.2.3.7
	 *
	 * NOTE: This is not a complete implementation!
	 *
	 * Example:
	 * var object = {};
	 *
	 * Object.defineProperties(object, {
	 *   a: {
	 *      value: 1
	 *   },
	 *   b: {
	 *      value: 2
	 *   }
	 * });
	 *
	 * console.log(object.a); //1
	 * console.log(object.b); //2
	*/
	if(!Object.defineProperties) {
		Object.defineProperties = function(object, properties) {
			if (type.call(object) !== '[object Object]' && type.call(properties) !== '[object Object]')
				throw new TypeError('Object.defineProperties( Object object, properties Object )');

			if (!Object.defineProperty)
				return object;

			for(var i in properties) {
				if(Object.prototype.hasOwnProperty.call(properties, i))
					Object.defineProperty(object, i, properties[i]);
			}
			return object;
		};
	}

	/**
	 * Object.keys ( Object object )
	 * Returns an array of all own enumerable properties found upon a given object,
	 * in the same order as that provided by a for-in loop
	 * @param {Object} The object whose enumerable own properties are to be returned.
	 * @return: Array
	 * @edition: ECMA-262 5th Edition, 15.2.3.14
	 *
	 * Example:
	 * Object.keys({a: 1});
	*/
	if(!Object.keys) {
		Object.keys = function(object) {
			if (type.call(object) !== '[object Object]')
				throw new TypeError('Object.keys'.concat(': ', object.toString(), ' is not an Object'));

			var array = [];

			for(var i in object) {
				if(Object.prototype.hasOwnProperty.call(object, i))
					array.push(i);
			}
			return array
		};
	}
}(Object.prototype.toString));


/**
 * Implementation of ECMAScript 5: Function
*/
(function(F) {
	/**
	 * Function.prototype.bind (thisArg [, arg1 [, arg2, …]]);
	 * Creates a new function that, when called, itself calls this function in the context
	 * of the provided this value, with a given sequence of arguments preceding
	 * any provided when the new function was called.
	 * @edition: ECMA-262 5th Edition, 15.3.4.5
	 * @param {this} The value to be passed as the this parameter to the target function
	 * when the bound function is called.
	 * @param {Arguments} Arguments to prepend to arguments provided to the bound function when invoking the target function.
	 * @return: a new function
	 * @author: Alexander Guinness
	 * @version: 1.0
	 * @license: MIT
	 *
	 * Example:
	 * var fn = function() {
	 *    return Array.prototype.slice.call(arguments);
	 * };
	 *
	 * var binded = fn.bind(null,1,2,3)(4,5);
	 * binded; // [1,2,3,4,5]
	 * binded.length; // 5
	 *
	 * var fn = function() {
	 *    return this.a;
	 * };
	 *
	 * var object = {
	 *   a: 1,
	 *   b: function() {
	 *      return this.a;
	 *   }
	 * };
	 *
	 * fn.bind(object)(); // 1
	 *
	*/
	if (!F.bind) {
		F.bind = function (context) {
			if (typeof this !== 'function')
			  throw new TypeError('Function.prototype.bind: '.concat(this, 'is not callable!'));

			var __slice__ = function(args, i) {
				return Array.prototype.slice.call(args, i || 0);
			},

			args = __slice__(arguments, 1),
			target = this,
			__new__ = function() {},

			bound = function() {
				return target.apply(
					this instanceof __new__ ? this : context || null, args.concat(__slice__(arguments))
				);
			};

			__new__.prototype = this.prototype;
			bound.prototype = new __new__;

			return bound;
		};
	}

	/*
	 * Function.prototype.apply (thisArg, argArray);
	 * 15.3.4.3: In Edition 3, a TypeError is thrown if the second argument passed to
	 * Function.prototype.apply is neither an array object nor an arguments object. In Edition 5, the second
	 * argument may be any kind of generic array-like object that has a valid length property.
	 *
	 * @author: Alexander Guinness
	 * @version: 1.0
	 * @license: MIT
	 *
	 * Example:
	 * Math.max.apply(null, {length: 2, 0: 0, 1: 1}); // 1
	*/
	(function(apply) {
		try {
			Function.apply(null, {length: 0});
		}
		catch (error) {
			Function.prototype.apply = function(context, object)
			{
				if (Object.prototype.toString.call(object) !== '[object Array]')
					object = Array.prototype.slice.call(object);

				return apply.call(this, context, object);
			}
		}
	}(Function.prototype.apply));

}(Function.prototype));



/**
 * Implementation of ECMAScript 5: String
*/
(function($) {
	/**
	 * String.prototype.trim ( )
	 * Removes whitespace from both ends of the string
	 * @edition: ECMA-262 5th Edition, 15.5.4.20
	 * @return {String} the string stripped of whitespace from both ends
	 * @author: Alexander Guinness
	 * @version: 1.0
	 * @license: MIT
	 * @date: 11:34 PM 4/12/12
	*/
	if(!$.trim) $.trim = function () {
		var expr = '\\s\\x09\\x0a\\x0\\x0c\\x0d\\x20\\xA0\\x85\\u1680\\u180E\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF';
		return this.replace(RegExp('^[' + expr + ']+|[' + expr + ']+$', 'g'), '');
	};
}(String.prototype));
