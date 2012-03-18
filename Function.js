/**
 * Implementation of ECMAScript 5: Function
 * Licensed under the MIT
 * @author: Alexander Guinness
 * @version: 1.0
 * license: MIT
 * @date: Sun Apr 15 12:29:00 2012
 **/

(function($) {
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
	 *};
	 *
	 * var binded = fn.bind(null,1,2,3)(4,5);
	 * console.log(binded); // [1,2,3,4,5]
	 * console.log(binded.length); // 5
	 *
	 * var fn = function() {
	 *    return this.a;
	 * };
	 *
	 *var object = {
	*   a: 1,
	*   b: function() {
	*      return this.a;
	*   }
	 *};
	 *
	 *console.log(fn.bind2(object)()); // 1
	 *
	*/
	if (!$.bind2) {
		$.bind2 = function bind(context) {
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
}(Function.prototype));
