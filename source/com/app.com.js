 /**
  * The base object for any TruxModel or TruxCollection.
  *
  * @global
  * @class
  */
var Trux = function () {
    'use strict';

    /**
     * Private reference to this instance
     *
     * @prop {Object} _this - Private reference to this instance
     * @private
     */
    var _this = this;

    /**
     * Reference for bound React components
     *
     * @prop {Object} components - reference for bound React components
     */
    this.components = {};

    /**
     * The model's Event Emitter
     *
     * @prop {Object} emitter - the model's Event Emitter
     */
    this.emitter = new EventEmitter();

    /**
     * Request options which align with the qwest options argument for requests.
     *
     * @see https://github.com/pyrsmk/qwest#basics
     * @prop {Object} requestOptions - options to be set for the request
     */
    this.requestOptions = {};

    /**
     * The GET route for this object
     *
     * @prop {String} GET - the GET route for this object
     */
    this.GET = false;

    /**
     * The POST route for this object
     *
     * @prop {String} POST - the POST route for this object
     */
    this.POST = false;

    /**
     * The PUT route for this object
     * @prop {String} PUT - the PUT route for this object
     *
     */
    this.PUT = false;

    /**
     * The PATCH route for this object
     *
     * @prop {String} PATCH - the PATCH route for this object
     */
    this.PATCH = false;

    /**
     * The DELETE route for this object
     *
     * @prop {String} DELETE - the DELETE route for this object
     */
    this.DELETE = false;

    /**
     * Sets the options for the request.
     *
     * @param {Object} requestOptions - the options for all requests
     * @return void
     */
    this.setRequestOptions = function (requestOptions) {
        this.requestOptions = requestOptions;
    };

    /**
     * A boolean value to decide whether to poll remote data or not.
     *
     * @prop {Boolean} poll - a boolean value to decide whether to poll remote data or not
     */
    this.poll = false;

    /**
     * The time to wait to poll the remote data.
     *
     * @prop {Integer} wait - the time to wait to poll the remote data
     */
    this.wait = 5000;

    this.emitter.addListener('change', broadcast);

    /**
     * Broadcast changes to all bound React components.
     *
     * @implements component.appDataDidChange
     * @return void
     */
    function broadcast() {
        if (!Object.keys(_this.components).length) return;

        for (var prop in _this.components) {
            if(_this.components.hasOwnProperty(prop)) {
                _this.components[prop].appDataDidChange();
            }
        }
    }

    /**
     * Bind a React component to this Trux instance.
     * Bound components receive updates via this.broadcast.
     * Each component is required to have a unique truxId property set.
     * Should be called within the component's componentWillMount or componentDidMount methods.
     *
     * @param {Object} component - the React class to bind to this instance
     * @return void
     */
    this.bindComponent = function (component) {
        _this.components[component.truxId] = component;
    };

    /**
     * Unbinds a React component from this Trux instance.
     * Stops the component from receiving updates.
     * Should be called within the component's componentWillUnmount method.
     *
     * @param {Object} component - the React class to unbind from this instance
     * @return void
     */
    this.unbindComponent = function (component) {
        if (typeof _this.components[component.truxId] === 'undefined') return;

        delete _this.components[component.truxId];
    };

    /**
     * Emits a change event from this Trux instance.
     *
     * @implements EventEmitter.emitEvent
     * @fires this.emitter.change
     * @return void
     */
    this.emitChangeEvent = function () {
        _this.emitter.emitEvent('change');
    };
};

 /**
  * A store for an array of models.
  *
  * @param {String} name - the name of this TruxCollection
  * @param {Function} modelConstructor - a constructor for a TruxModel
  * @return {Object} this - this TruxCollection
  * @example
    //basic usage
    var MyCollection = new TruxCollection('My Collection', TruxModel);
  * @example
    //advanced usage
    var MyCollection = function () {
        TruxCollection.call(this);

        this.getCategories = function () {
            categories = [];

            this.models.forEach(function (item) {
                categories.push(item.data.category);
            });

            return categories;
        };
    };
  * @class
  */
var TruxCollection = function (modelConstructor) {
    'use strict';

    Trux.call(this);

    /**
     * Private reference to this TruxModel instance.
     *
     * @prop {Object} _this - private reference to this instance
     * @private
     */
    var _this = this;

    /**
     * The TruxModel class for the models contained within this collection.
     *
     * @prop {Object} modelConstructor - the TruxModel class for the models contained within this collection
     */
    this.modelConstructor = modelConstructor;

    /**
     * The array of TruxModels stored in this TruxCollection.
     *
     * @prop {Array} models - an array of TruxModels
     */
    this.models = [];

    /**
     * An easy way of determining what kind of class this is.
     *
     * @prop {String} className -  easy way of determining what kind of class this is
     */
    this.className = 'TruxCollection';

    /**
     * Requests a collection from a remote store.
     *
     * @implements qwest.get
     * @param object {options} - optional options containing possible onDone and onFail methods
     * @return void
     */
    this.fetch = function(options) {
        qwest.get(this.GET, null, this.requestOptions)
        .then(function (xhr, response) {
            _this.setModels(response);

            if (options && typeof options.onDone === 'function') {
                options.onDone(response);
            }
        })
        .catch(function (xhr, response, e) {
            if (options && typeof options.onFail === 'function') {
                options.onFail(xhr, response, e);
            }
        });
    };

    /**
     * Sets the models for this collection.
     * Instantiates a TruxModel for each data item contained with in the models param.
     * Appends these models into the data property of this TruxCollection instance.
     *
     * @param {Array} models - an array of JSON objects, each object must have an id property
     * @return {Object} _this - object instance
     */
    this.setModels = function (models) {
        if(!Array.isArray(models)) return;

        _this.purgeModels();

        var length = models.length;
        var i;


        for (i = 0 ; i < length ; i++) {
            var model = new _this.modelConstructor(models[i]);
            _this.append(model);
        }

        return _this;
    };

    /**
     * Finds a model contained within this collection via its unique id.
     *
     * @param {Integer|String} id - a unique id which corresponds to a model stored in this collection
     * @return {Object|Boolean} model - an object if the model was found, false if not
     */
    this.findById = function (id) {
        var length = this.models.length;
        var i;
        var model = false;

        for(i = 0 ; i < length ; i ++) {
            if(this.models[i].data.id == id || this.models[i].data.id == parseInt(id, 10)) {
                model = this.models[i];
            }
        }

        return model;
    };

    /**
     * Appends a model to the data property of this TruxCollection instance.
     *
     * @param {Object} model - a TruxModel instance
     * @return void
     */
    this.append = function (model) {
        model.collection = this;
        _this.models.push(model);
    };

    /**
     * Prepends a model to the data property of this TruxCollection instance.
     *
     * @param {Object} model - a TruxModel instance
     * @return void
     */
    this.prepend = function (model) {
        model.collection = _this;
        _this.models.unshift(model);
    };

    /**
     * Removes the collection's models from this instance.
     *
     * @return void
     */
    this.purgeModels = function () {
        this.models = [];
    };

    return this;
};

 /**
  * A client side interface for a remote data model.
  * <p>Each TruxModel is expected to have a unique <em>id</em> property.</p>
  *
  * @param {String} name - the name of this TruxModel
  * @return {Object} this - this TruxModel
  * @example
    //basic usage
    var MyModel = new TruxModel('My Model');
  * @example
    //advanced usage
    var UserModel = function(data) {
        TruxModel.call(this);

        this.setData(data);

        this.getName = function () {
            return this.data.name;
        }

        this.setName = function (name) {
            this.data.name = name;
        }
    }
  * @class
  */
var TruxModel = function (data) {
    'use strict';

    Trux.call(this);

    /**
     * Private reference to this TruxModel instance.
     *
     * @prop {Object} _this - private reference to this instance
     * @private
     */
    var _this = this;

    /**
     * Private backup of the model's data, initially null.
     *
     * @prop {Null|Object} _this -  private backup of the model's data, initially null
     * @private
     */
    var _backup = null;

    /**
     * The model's unique id.
     *
     * @prop {Null|String|Number} id - the model's unique id
     */
    this.id = null;

    /**
     * The data which defines this model, initially null.
     *
     * @prop {Null|Object} data - the data which defines this model, initially null
     */
    this.data = data;

    /**
     * A public backup of this model's data, initially null.
     *
     * @prop {Null|Object} backup - a public backup of this model's data, initially null
     */
    this.backup = null;

    /**
     * The name of this model.
     *
     * @prop {String} name - this name of this model
     */
    this.name = '';

    /**
     * The collection this model belongs to, if it does belong to one. Initially false.
     *
     * @prop {Boolean|Object} collection - the collection this model belongs to
     */
    this.collection = false;

    /**
     * Easy way of determining what kind of class this is.
     *
     * @prop {String} className - easy way of determining what kind of class this is
     */
    this.className = 'TruxModel';

    /**
     * Set the id for the model.
     *
     * @prop {String|Number} id - the id of this model
     * @return {Object} this - this TruxModel
     */
     this.setId = function (id) {
         this.id = id;
         return this;
     };


    /**
     * Set the data for this TruxModel instance.
     * Also sets the private _backup for this instance.
     *
     * @param {Object} data - the data that defines this model
     * @return {Object} this - this TruxModel
     */
    this.setData = function (data) {
        this.data = data;
        _backup = JSON.parse(JSON.stringify(data));
        return this;
    };

    /**
     * Restores the model's data from the privately stored _backup.
     *
     * @return {Object} this - this TruxModel
     */
    this.restoreData = function () {
        this.data = JSON.parse(JSON.stringify(_backup));
        return this;
    };

    /**
     * Gets the id for this model.
     *
     * @return {Integer|String} id - the model's unique id
     */
    this.getId = function () {
        return this.data.id;
    };

    /**
     * Persits the model's data throughout its bound components.
     * Emits the model's change event.
     *
     * @return {Object} this - this TruxModel
     */
    this.persist = function () {
        if (this.collection) {
            this.collection.emitChangeEvent();
        } else {
            this.emitChangeEvent();
        }

        return this;
    };

    /**
     * Requests the remote data for the model, then sets the TruxModel data with the response.
     *
     * @implements qwest.get
     * @param {Object} options - optional onDone and onFail methods to run when promises are resolved
     * @return void
     */
    this.fetch = function (options) {
        qwest.get(this.GET, null, this.requestOptions)
            .then(function (xhr, response) {
                if (typeof response !== 'object') return;

                _this.setData(response);

                if (typeof options.onDone === 'function') {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                if (typeof options.onFail === 'function') {
                    options.onFail(xhr, response, e);
                }
            });
    };

    /**
     * Creates a new instance of this model in the remote data store.
     *
     * @implements qwest.post
     * @param {Object} data - the data for the new model
     * @param {Object} options - optional onDone and onFail methods to run once promises are resolved
     * @return void
     */
    this.create = function (data, options) {
        qwest.post(this.POST, data, this.requestOptions)
            .then(function (xhr, response) {
                console.log(response);
                if (typeof response !== 'object') return;

                _this.setData(response);

                if (typeof options.onDone === 'function') {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                if (typeof options.onFail === 'function') {
                    options.onFail(xhr, response, e);
                }
            });
    };

    /**
     * Updates this model in the remote data store.
     *
     * @implements qwest.put
     * @implements EventEmitter.emitEvent
     * @param {Object} data - the new data for the model
     * @param {Object} options - optional onDone and onFail methods to run once promises are resolved
     * @return void
     */
    this.update = function (data, options) {
        qwest.put(this.PUT, data, this.requestOptions)
            .then(function (xhr, response) {
                if (typeof response !== 'object') return;

                _this.setData(response).persist();

                if (typeof options.onDone === 'function') {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                _this.restoreData().persist();

                if (typeof options.onFail === 'function') {
                    options.onFail(xhr, response, e);
                }
            });
    };

    /**
     * Polls the remote data store.
     *
     * @implements qwest.get
     * @param {Boolean|Undefined} poll - true when first starting to poll, undefined while in recursion
     * @return void
     */
    this.startPolling = function (poll) {
        if (poll === true) this.poll = true;

        (function () {
            if (this.poll === false) return;

            setTimeout(function () {
                qwest.get(this.GET, null, this.requestOptions)
                    .then(function (xhr, response) {
                        _this.setData(response)
                            .persist()
                            .startPolling();
                    })
                    .catch(function (xhr, response, e) {
                        _this.restoreData()
                            .persist();
                    });
            }, _this.wait);
        })();
    };

    /**
     * Sets this.poll to false so that the next time startPolling runs it will cancel the recursion.
     *
     * @return {Object} this - this TruxModel
     */
    this.stopPolling = function () {
        this.poll = false;
        return this;
    };

    /**
     * Clears this model's data property.
     *
     * @return void
     */
    this.purge = function () {
        this.data = null;
    };

    return this;
};
