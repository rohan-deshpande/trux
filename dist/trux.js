(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("trux", [], factory);
	else if(typeof exports === 'object')
		exports["trux"] = factory();
	else
		root["trux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wolfy87Eventemitter = __webpack_require__(5);

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    /**
     * Private reference to this store
     *
     * @prop {object} store - private reference to this store
     * @private
     */
    var store = this;

    /**
     * Reference for bound components
     *
     * @prop {object} components - reference for bound components
     */
    this.components = {};

    /**
     * The base Event Emitter
     *
     * @prop {object} emitter - the model's Event Emitter
     */
    this.emitter = new _wolfy87Eventemitter2.default();

    /**
     * Headers to be sent with the request
     *
     * @prop {object} requestHeaders - request headers
     */
    this.requestHeaders = {
      'Content-Type': 'application/json'
    };

    /**
     * The GET route for this object
     *
     * @prop {string} GET - the GET route for this object
     */
    this.GET = '';

    /**
     * The POST route for this object
     *
     * @prop {string} POST - the POST route for this object
     */
    this.POST = '';

    /**
     * The PUT route for this object
     * @prop {string} PUT - the PUT route for this object
     *
     */
    this.PUT = '';

    /**
     * The PATCH route for this object
     *
     * @prop {string} PATCH - the PATCH route for this object
     */
    this.PATCH = '';

    /**
     * The DELETE route for this object
     *
     * @prop {string} DELETE - the DELETE route for this object
     */
    this.DELETE = '';

    /**
     * Broadcast changes to all bound components.
     *
     * @private
     * @return void
     */
    function broadcast() {
      if (!Object.keys(store.components).length) {
        return;
      }

      for (var prop in store.components) {
        if (store.components.hasOwnProperty(prop)) {
          store.components[prop].storeDidUpdate();
        }
      }
    }

    this.emitter.addListener('change', broadcast);
  }

  /**
   * Bind a component to this store.
   * Bound components receive updates via broadcast.
   * Each component is required to have a unique truxId property set.
   *
   * @NOTE for react, this should be called within the component's componentWillMount or componentDidMount methods.
   *
   * @param {object} component - the  class to bind to this instance
   * @return void
   */


  _createClass(Store, [{
    key: 'bindComponent',
    value: function bindComponent(component) {
      this.components[component.truxId] = component;

      if (typeof component.storeDidUpdate !== 'function') {
        console.warn('The component you have bound to this store does not contain a storeDidUpdate method');
      }
    }

    /**
     * Unbinds a component from this store.
     * Stops the component from receiving updates.
     *
     * @NOTE for react, this should be called within the component's componentWillUnmount method.
     *
     * @param {object} component - the React class to unbind from this instance
     * @throws Error
     * @return void
     */

  }, {
    key: 'unbindComponent',
    value: function unbindComponent(component) {
      if (typeof this.components[component.truxId] === 'undefined') {
        throw new Error('The component you are attempting to unbind is not bound to this store');
      }

      delete this.components[component.truxId];
    }

    /**
     * Unbinds all components from this store.
     *
     * @return {object} Store
     */

  }, {
    key: 'unbindAllComponents',
    value: function unbindAllComponents() {
      for (var truxId in this.components) {
        if (this.components.hasOwnProperty(truxId)) {
          delete this.components[truxId];
        }
      }

      return this;
    }

    /**
     * Emits a change event from this store.
     *
     * @fires this.emitter.change
     * @return void
     */

  }, {
    key: 'emitChangeEvent',
    value: function emitChangeEvent() {
      this.emitter.emitEvent('change');
    }

    /**
     * Adds a request header.
     *
     * @param {string} key - the key for the header
     * @param {mixed} value - the value for the header
     * @return {object} Store
     */

  }, {
    key: 'addRequestHeader',
    value: function addRequestHeader(key, value) {
      this.requestHeaders[key] = value;

      return this;
    }

    /**
     * Deletes a request header.
     *
     * @param {string} key - the key for the header to delete
     * @return {object} Store
     */

  }, {
    key: 'deleteRequestHeader',
    value: function deleteRequestHeader(key) {
      delete this.requestHeaders[key];

      return this;
    }

    /**
     * Helper to get the current unix timestamp in ms.
     *
     * @return {number}
     */

  }, {
    key: 'getUnixTimestamp',
    value: function getUnixTimestamp() {
      return Date.now();
    }

    /**
     * Set the store's request headers.
     *
     * @param {object} headers - headers object
     * @return void
     */

  }, {
    key: 'requestHeaders',
    set: function set(headers) {
      this._requestHeaders = headers;
    }

    /**
     * Gets the store's request headers.
     *
     * @return {object}
     */
    ,
    get: function get() {
      return this._requestHeaders;
    }

    /**
     * Sets the wasFetched and wasFetchedAt properties.
     *
     * @param {boolean} wasFetched
     * @return void
     */

  }, {
    key: 'wasFetched',
    set: function set(wasFetched) {
      this._wasFetched = wasFetched ? true : false;
      this._wasFetchedAt = wasFetched ? this.getUnixTimestamp() : this.wasFetchedAt;
    }

    /**
     * Gets the wasFetched property.
     *
     * @return {boolean}
     */
    ,
    get: function get() {
      return this._wasFetched;
    }

    /**
     * Gets the wasFetchedAt property.
     *
     * @return {number}
     */

  }, {
    key: 'wasFetchedAt',
    get: function get() {
      return this._wasFetchedAt;
    }
  }]);

  return Store;
}();

exports.default = Store;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("rd-fetch", [], factory);
	else if(typeof exports === 'object')
		exports["rd-fetch"] = factory();
	else
		root["rd-fetch"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULTS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.json = json;

var _utils = __webpack_require__(1);

var DEFAULTS = exports.DEFAULTS = {
  method: 'GET',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  body: null
};

function json(url, options) {
  return fetch(url, {
    method: options.method.toUpperCase() || DEFAULTS.method,
    headers: options.headers || DEFAULTS.headers,
    body: options.body ? JSON.stringify(options.body) : DEFAULTS.body
  }).then(function (response) {
    var contentType = response.headers.get('Content-Type');

    if (contentType && contentType.indexOf('application/json') < 0) {
      throw new TypeError('Content-Type of response is not application/json');
    }

    if (response.ok) {
      return response.text().then(function (text) {
        response.json = (0, _utils.isJson)(text) ? JSON.parse(text) : null;

        return Promise.resolve(response);
      });
    }

    return response.text().then(function (text) {
      response.json = (0, _utils.isJson)(text) ? JSON.parse(text) : null;

      return Promise.reject(response);
    });
  }).catch(function (error) {
    if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) !== 'object') {
      console.error(error);
    }

    return Promise.reject(error);
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isJson = isJson;
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _json = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fetch = function () {
  function Fetch() {
    _classCallCheck(this, Fetch);
  }

  _createClass(Fetch, null, [{
    key: 'json',
    value: function json(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _json.DEFAULTS;

      if (!url) {
        throw new Error('You must provide a url resource to fetch');
      }
      return (0, _json.json)(url, options);
    }
  }]);

  return Fetch;
}();

exports.default = Fetch;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=rd-fetch.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Store2 = __webpack_require__(0);

var _Store3 = _interopRequireDefault(_Store2);

var _rdFetch = __webpack_require__(1);

var _rdFetch2 = _interopRequireDefault(_rdFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collection = function (_Store) {
  _inherits(Collection, _Store);

  /**
   * A store for many models.
   *
   * @param {function} model - the constructor for the model which this collection contains
   * @return {object} this - collection
   * @constructor
   */
  function Collection(model) {
    var _ret;

    _classCallCheck(this, Collection);

    var _this = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this));

    if (typeof model !== 'function') {
      throw new TypeError('You must supply a model constructor to a collection');
    }

    _this.model = model;
    _this.models = [];

    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Fills the collection with models.
   * Instantiates a Model for each data item contained with in the passed array.
   * Appends these models into this.models.
   *
   * @param {array} models - array of model data objects
   * @return {object} Collection
   */


  _createClass(Collection, [{
    key: 'fill',
    value: function fill(models) {
      var length = models.length;

      if (!Array.isArray(models)) {
        throw new TypeError('collections can only be filled with arrays of models');
      }

      this.purge();

      for (var i = 0; i < length; i++) {
        this.append(new this.model(models[i]));
      }

      return this;
    }

    /**
     * Appends a model to the collection's models.
     *
     * @param {object} model - a model, must be an instance of this.model
     * @return {object} Collection
     */

  }, {
    key: 'append',
    value: function append(model) {
      if (!(model instanceof this.model)) {
        throw new Error('collections can only contain one kind of trux model');
      }

      model.collection = this;
      this.models.push(model);

      return this;
    }

    /**
     * Prepends a model to the collection's models.
     *
     * @param {object} model - a model, must be an instance of this.model
     * @return {object} Collection
     */

  }, {
    key: 'prepend',
    value: function prepend(model) {
      if (!(model instanceof this.model)) {
        throw new Error('collections can only contain one kind of trux model');
      }

      model.collection = this;
      this.models.unshift(model);

      return this;
    }

    /**
     * Purges the collection of its models.
     *
     * @return void
     */

  }, {
    key: 'purge',
    value: function purge() {
      this.models = [];
    }

    /**
     * Gets a collection from a remote resource.
     *
     * @return {object} Promise
     */

  }, {
    key: 'fetch',
    value: function fetch() {
      var _this2 = this;

      return _rdFetch2.default.json(this.GET, {
        method: 'GET',
        headers: this.requestHeaders
      }).then(function (response) {
        _this2.fill(response.json);

        return Promise.resolve(response);
      }).catch(function (error) {
        return Promise.reject(error);
      });
    }

    /**
     * Extends Collectioj and returns the constructor for the new class.
     * Convenience method for ES5.
     *
     * @deprecated
     * @param {object} props - custom props for the new class
     * @param {function|undefined} setup - an optional function to run within the new class' constructor
     * @return {function} Extension - the extended class
     */

  }], [{
    key: 'extend',
    value: function extend(props, setup) {
      var Extension = function (_Collection) {
        _inherits(Extension, _Collection);

        function Extension(model) {
          _classCallCheck(this, Extension);

          var _this3 = _possibleConstructorReturn(this, (Extension.__proto__ || Object.getPrototypeOf(Extension)).call(this, model));

          if (typeof setup === 'function') {
            setup(_this3);
          }
          return _this3;
        }

        return Extension;
      }(Collection);

      if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) === 'object') {
        for (var prop in props) {
          if (props.hasOwnProperty(prop)) {
            Extension.prototype[prop] = props[prop];
          }
        }
      }

      return Extension;
    }

    /**
     * Modifies the Collection class with the passed properties.
     * This will enable all custom collections to inherit the properties passed to this method.
     *
     * @param {object} props - the props to add to the Collection class
     * @return void
     */

  }, {
    key: 'modify',
    value: function modify(props) {
      if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') return;

      for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
          Collection.prototype[prop] = props[prop];
        }
      }
    }
  }]);

  return Collection;
}(_Store3.default);

exports.default = Collection;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Store2 = __webpack_require__(0);

var _Store3 = _interopRequireDefault(_Store2);

var _rdFetch = __webpack_require__(1);

var _rdFetch2 = _interopRequireDefault(_rdFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Model = function (_Store) {
  _inherits(Model, _Store);

  /**
   * A client side interface for a remote data Model.
   *
   * @param {object} data - the data which defines this Model
   * @return {object} this - this Model
   * @constructor
   */
  function Model(data) {
    _classCallCheck(this, Model);

    var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

    var backup = !data || Object.keys(data).length === 0 ? {} : JSON.parse(JSON.stringify(data));

    /**
     * The data which defines this model, initially null.
     *
     * @prop {object|null} data - the data which defines this Model, initially null
     */
    _this.data = data || null;

    /**
     * The collection this model belongs to, if it does belong to one. Initially false.
     *
     * @prop {boolean|object} collection - the collection this model belongs to
     */
    _this.collection = false;

    /**
     * Fills the model with data.
     * Also sets the private backup for this model.
     *
     * @param {object} data - the data that defines this model
     * @return {object} Model
     */
    _this.fill = function (data) {
      _this.data = data;
      backup = !data || Object.keys(data).length === 0 ? {} : JSON.parse(JSON.stringify(data));

      return _this;
    };

    /**
     * Restores the model's data from a previously stored backup.
     *
     * @return {object} Model
     */
    _this.restore = function () {
      _this.data = !backup || Object.keys(backup).length === 0 ? {} : JSON.parse(JSON.stringify(backup));

      return _this;
    };
    return _this;
  }

  /**
   * Persits the model's data throughout its bound components.
   * Emits the model's change event and, if it belongs to a collection, the collection's change event also.
   *
   * @return {object} Model
   */


  _createClass(Model, [{
    key: 'persist',
    value: function persist() {
      if (this.collection) {
        this.collection.emitChangeEvent();
      }

      this.emitChangeEvent();

      return this;
    }

    /**
     * Fetches the remote data for the model, then fills the model with the JSON response.
     *
     * @return {Object} Promise
     */

  }, {
    key: 'fetch',
    value: function fetch() {
      var _this2 = this;

      return _rdFetch2.default.json(this.GET, {
        method: 'GET',
        headers: this.requestHeaders
      }).then(function (response) {
        _this2.wasFetched = true;
        _this2.fill(response.json).persist();

        return Promise.resolve(response);
      }).catch(function (error) {
        _this2.wasFetched = false;

        return Promise.reject(error);
      });
    }

    /**
     * Creates a new model in the remote data store.
     *
     * @param {object} data - the data for the new model
     * @return {object} Promise
     */

  }, {
    key: 'create',
    value: function create(data) {
      var _this3 = this;

      return _rdFetch2.default.json(this.POST, {
        method: 'POST',
        headers: this.requestHeaders,
        body: data
      }).then(function (response) {
        _this3.wasCreated = true;
        _this3.fill(response.json).persist();

        return Promise.resolve(response);
      }).catch(function (error) {
        _this3.wasCreated = false;

        return Promise.reject(error);
      });
    }

    /**
     * Updates the model in the remote data store.
     *
     * @param {object} data - the data to update the model with
     * @param {string} [method] - the method to use, should be either PUT or PATCH, defaults to PUT
     * @return {object} Promise
     */

  }, {
    key: 'update',
    value: function update(data) {
      var _this4 = this;

      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'PUT';

      return _rdFetch2.default.json(this[method], {
        method: method,
        headers: this.requestHeaders,
        body: data
      }).then(function (response) {
        _this4.wasUpdated = true;
        _this4.fill(response.json).persist();

        return Promise.resolve(response);
      }).catch(function (error) {
        _this4.wasUpdated = false;
        _this4.restore().persist();

        return Promise.reject(error);
      });
    }

    /**
     * Sends a request to delete from the remote data store, then purges and unbinds all components from the model.
     *
     * @return {object} Promise
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      return _rdFetch2.default.json(this.DELETE, {
        method: 'DELETE',
        headers: this.requestHeaders
      }).then(function (response) {
        _this5.wasDestroyed = true;
        _this5.purge().unbindAllComponents();

        return Promise.resolve(response);
      }).catch(function (error) {
        _this5.wasDestroyed = false;
        _this5.restore().persist();

        return Promise.reject(error);
      });
    }

    /**
     * Purges the model of its data.
     *
     * @return {object} Model
     */

  }, {
    key: 'purge',
    value: function purge() {
      this.data = null;

      return this;
    }

    /**
     * Sets the wasCreated and wasCreatedAt properties.
     *
     * @param {boolean} wasCreated
     * @return void
     */

  }, {
    key: 'wasCreated',
    set: function set(wasCreated) {
      this._wasCreated = wasCreated ? true : false;
      this._wasCreatedAt = wasCreated ? this.getUnixTimestamp() : this.wasCreatedAt;
    }

    /**
     * Gets the wasCreated property.
     *
     * @return {boolean}
     */
    ,
    get: function get() {
      return this._wasCreated;
    }

    /**
     * Gets the wasCreatedAt timestamp.
     *
     * @return {number}
     */

  }, {
    key: 'wasCreatedAt',
    get: function get() {
      return this._wasCreatedAt;
    }

    /**
     * Sets the wasUpdated and wasUpdatedAt properties.
     *
     * @param {boolean} wasUpdated
     * @return void
     */

  }, {
    key: 'wasUpdated',
    set: function set(wasUpdated) {
      this._wasUpdated = wasUpdated ? true : false;
      this._wasUpdatedAt = wasUpdated ? this.getUnixTimestamp() : this.wasUpdatedAt;
    }

    /**
     * Gets the wasUpdated property.
     *
     * @return {boolean}
     */
    ,
    get: function get() {
      return this._wasUpdated;
    }

    /**
     * Gets the wasUpdatedAt property.
     *
     * @return {number}
     */

  }, {
    key: 'wasUpdatedAt',
    get: function get() {
      return this._wasUpdatedAt;
    }

    /**
     * Sets the wasDestroyed and wasDestroyedAt properties.
     *
     * @param {boolean} wasDestroyed
     * @return void
     */

  }, {
    key: 'wasDestroyed',
    set: function set(wasDestroyed) {
      this._wasDestroyed = wasDestroyed ? true : false;
      this._wasDestroyedAt = wasDestroyed ? this.getUnixTimestamp() : this.wasDestroyedAt;
    }

    /**
     * Gets the wasDestroyed property.
     *
     * @return  {boolean}
     */
    ,
    get: function get() {
      return this._wasDestroyed;
    }

    /**
     * Gets the wasDestroyedAt property.
     *
     * @return {number}
     */

  }, {
    key: 'wasDestroyedAt',
    get: function get() {
      return this._wasDestroyedAt;
    }

    /**
     * Extends Model and returns the constructor for the new class.
     * Convenience method for ES5.
     *
     * @deprecated
     * @param {object} props - custom props for the new class
     * @param {function|undefined} setup - an optional function to run within the new class' constructor
     * @return {function} Extension - the extended class
     */

  }], [{
    key: 'extend',
    value: function extend(props, setup) {
      var Extension = function (_Model) {
        _inherits(Extension, _Model);

        function Extension(data) {
          _classCallCheck(this, Extension);

          var _this6 = _possibleConstructorReturn(this, (Extension.__proto__ || Object.getPrototypeOf(Extension)).call(this, data));

          if (typeof setup === 'function') {
            setup(_this6);
          }
          return _this6;
        }

        return Extension;
      }(Model);

      if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) === 'object') {
        for (var prop in props) {
          if (props.hasOwnProperty(prop)) {
            Extension.prototype[prop] = props[prop];
          }
        }
      }

      return Extension;
    }

    /**
     * Modifies the Model class with the passed properties.
     * This will enable all custom models to inherit the properties passed to this method.
     *
     * @param {object} props - the props to add to the Trux.Model class
     * @return void
     */

  }, {
    key: 'modify',
    value: function modify(props) {
      if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') return;

      for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
          Model.prototype[prop] = props[prop];
        }
      }
    }
  }]);

  return Model;
}(_Store3.default);

exports.default = Model;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Store = __webpack_require__(0);

var _Store2 = _interopRequireDefault(_Store);

var _Model = __webpack_require__(3);

var _Model2 = _interopRequireDefault(_Model);

var _Collection = __webpack_require__(2);

var _Collection2 = _interopRequireDefault(_Collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trux = {
  Store: _Store2.default,
  Model: _Model2.default,
  Collection: _Collection2.default
};

exports.default = Trux;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return EventEmitter;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));


/***/ })
/******/ ]);
});
//# sourceMappingURL=trux.js.map