/**
 * Implementation of ECMAScript 5: Function
 * Licensed under the MIT
 * @author: Alexander Guinness
 * @version: 1.0
 * license: MIT
 * @date: Sun Apr 15 12:29:00 2012
 **/

(function(F) {
	'use strict';

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
	}(F.apply));

}(Function.prototype));
