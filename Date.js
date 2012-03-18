/**
 * Implementation of ECMAScript 5: Date
 * @author: Alexander Guinness
 * @version: 1.0
 * license: MIT
 * @date: Sun Apr 15 01:55:00 2012
 **/

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

