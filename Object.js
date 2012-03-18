/**
 * Implementation of ECMAScript 5: Object
 * @author: Alexander Guinness
 * @version: 1.0
 * license: MIT
 * @date: Sun Apr 15 00:08:00 2012
 **/

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
	*/

	if(!Object.create) {
		Object.create = function(object, properties) {
			if (type.call(object) !== '[object Object]')
				throw new TypeError('Object.create'.concat(': ', object.toString(), ' is not an Object or Null'));

			var __new__ = function() {};
			_.prototype = object;
			var init = new __new__();
			__new__.constructor.prototype = object;

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