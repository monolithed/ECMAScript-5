/**
 * String.prototype.trim ( )
 * Removes whitespace from both ends of the string
 * @edition ECMA-262 5th Edition, 15.5.4.20
 * @return {String} the string stripped of whitespace from both ends
 * @date 11:34 PM 4/12/12
*/

(function($) {
	if(!$.trim) $.trim = function () {
		var expr = '\\s\\x09\\x0a\\x0\\x0c\\x0d\\x20\\xA0\\x85\\u1680\\u180E\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF';
		return this.replace(RegExp('^[' + expr + ']+|[' + expr + ']+$', 'g'), '');
	};
}(String.prototype));
