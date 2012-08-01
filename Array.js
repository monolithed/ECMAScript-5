/**
 * Implementation of ECMAScript 5: Array
 * Licensed under the MIT
 * @author: Alexander Guinness
 * @version: 1.1
 * @date: Fri Jun 27 17:26:00 2011
 **/

(function(A) {
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
	if(!A.indexOf) {
		A.indexOf = function(object, from)
		{
			var length = this.length,
			i = from || 0;
			i = Math[i < 0 ? 'ceil' : 'floor'](i) - 1;

			while (++i <= length) {
				if (i in this && this[i] === object)
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
	if(!A.every) {
		A.every = function(fn, object)
		{
			if (typeof fn !== 'function')
				throw new TypeError('Array.prototype.every'.concat(': ', fn.toString(), ' is not a function'));

			var length = this.length, i = -1;

			while (++i < length) {
				if (i in this && !fn.call(object, this[i], i, this))
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
	if(!A.some) {
		A.some = function(fn, object)
		{
			if (typeof fn !== 'function')
				throw new TypeError('Array.prototype.some'.concat(': ', fn.toString(), ' is not a function'));

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
	if(!A.forEach) {
		A.forEach = function(fn, object)
		{
			if (typeof fn !== 'function')
				throw new TypeError('Array.prototype.forEach'.concat(': ', fn.toString(), ' is not a function'));

			var length = this.length, i = -1;

			while(i++ < length) {
				if(Object.prototype.hasOwnProperty.call(this, i))
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
	if(!A.map) {
		A.map = function(fn, object)
		{
			if (typeof fn !== 'function')
				throw new TypeError('Array.prototype.map'.concat(': ', fn.toString(), ' is not a function'));

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
	if(!A.filter) {
		A.filter = function(fn, object)
		{
			if (typeof fn !== 'function')
				throw new TypeError('Array.prototype.filter'.concat(': ', fn.toString(), ' is not a function'));

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
	if(!A.reduce) {
		A.reduce = function(fn, init)
		{
			if (typeof fn !== 'function')
				throw new TypeError('Array.prototype.reduce'.concat(': ', fn.toString(), ' is not a function'));

			var length = this.length >>> 0, i = 0;

			if(arguments.length < 2) {
				init = this[0];
				i = 1;
			}
			else init = arguments[0];

			while(i++ < length) {
				if(i in this)
					init = fn.call(null, init, this[i], i, this);
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
	if(!A.reduceRight) {
		A.reduceRight = function(fn, init)
		{
			if (typeof fn !== 'function')
				throw new TypeError('Array.prototype.reduceRight'.concat(': ', fn.toString(), ' is not a function'));

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
					init = fn.call(null, init, this[i], i, this);
			}
			return init;
		}
	}
})(Array.prototype);
