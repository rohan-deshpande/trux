/**
 * Trux - the base object for any TruxModel or TruxCollection.
 *
 * @var object {_this} - private reference to this instance.
 * @property object {components} - object reference for bound React components.
 * @property object {emitter} - the model's event emitter.
 * @property string {GET} - the GET route for this instance.
 * @property string {POST} - the POST route for this instance.
 * @property string {PUT} - the PUT route for this instance.
 */
var Trux = function () {
    'use strict';

    var _this = this;

    this.components = {};
    this.emitter = new EventEmitter();
    this.GET = false;
    this.POST = false;
    this.PUT = false;
    this.PATCH = false;
    this.DELETE = false;

    this.emitter.addListener('change', broadcast);

    /**
     * Broadcast changes to all bound React components.
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
     * @param React class {component} - the React class to bind to this instance
     * @return void
     */
    this.bindComponent = function (component) {
        _this.components[component.truxId] = component;
    };

    /**
     * Unbinds a React component from this Trux instance.
     * Stops the component from receiving updates.
     * Should be called within the component's componentWillUnmount method.
     * @param React class {component} - the React class to unbind from this instance
     * @return void
     */
    this.unbindComponent = function (component) {
        if (typeof _this.components[component.truxId] === 'undefined') return;

        delete _this.components[component.truxId];
    };

    /**
     * Emits a change event from this Trux instance.
     * @implements EventEmitter.emitEvent
     * @return void
     */
    this.emitChangeEvent = function () {
        _this.emitter.emitEvent('change');
    };
};

/**
 * TruxCollection - a collection of TruxModels
 * Trux Collections are stores for groups of related models.
 *
 * @var object {_this} - private reference to this TruxCollection instance.
 * @property string {_name} - the name of this collection.
 * @property object {modelClass} - the TruxModel class for the models contained within this collection.
 * @property array {models} - an array of TruxModels.
 * @property string {className} - easy way of determining what kind of class this is.
 */
var TruxCollection = function (name, modelClass) {
    'use strict';

    var _this = this;

    Trux.call(this);

    this._name = name;
    this.modelClass = modelClass;
    this.models = [];
    this.className = 'TruxCollection';

    /**
     * Requests a collection from a remote store.
     * @implements qwest.get
     * @param object {options} - optional options containing possible onDone and onFail methods
     * @return void
     */
    this.request = function(options) {
        qwest.get(this.GET)
        .then(function (xhr, response) {
            _this.setModels(response);

            if (options && typeof options.onDone === 'function') {
                options.onDone();
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
     * @param array {models} - an array of JSON objects, each object must have an id property
     * @return object {_this} - object instance
     */
    this.setModels = function (models) {
        if(!Array.isArray(models)) return;

        _this.purgeModels();

        var length = models.length;
        var i;

        for (i = 0 ; i < length ; i++) {
            var model = new _this.modelClass(models[i]);
            _this.append(model);
        }

        return _this;
    };

    /**
     * Finds a model contained within this collection via its unique id.
     * @param mixed {id} - a unique id which corresponds to a model stored in this collection
     * @return mixed {object|bool} - an object if the model was found, false if not
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
     * @param object {model} - a TruxModel instance
     * @return void
     */
    this.append = function (model) {
        model.collection = this;
        _this.models.push(model);
    };

    /**
     * Prepends a model to the data property of this TruxCollection instance.
     * @param object {model} - a TruxModel instance
     * @return void
     */
    this.prepend = function (model) {
        model.collection = _this;
        _this.models.unshift(model);
    };

    /**
     * Caches the models for this collection in local storage.
     * @return void
     */
    this.cacheModels = function () {
        localStorage.setItem(_this._name, JSON.stringify(_this.models));
    };

    /**
     * Removes the collection's models from this instance and from local storage.
     * @return void
     */
    this.purgeModels = function () {
        this.models = [];
        localStorage.removeItem(_this._name);
    };
};

/**
 * TruxModel - a collection of TruxModels
 * Trux Models are client side interfaces for remote data models.
 * NOTE Trux Models assume that the remote data each model mirrors has a unique `id` property.
 *
 * @var object {_this} - private reference to this TruxModel instance.
 * @var mixed {_backup} - private backup of the model's data, initially null.
 * @property mixed {data} - the data which defines this model, initially null.
 * @property mixed {backup} - a public backup of this model's data, initially null.
 * @property string {_name} - the name of this model.
 * @property mixed {collection} - the collection this model belongs to, if it does belong to one. Initially false.
 * @property string {className} - easy way of determining what kind of class this is.
 */
var TruxModel = function (name) {
    'use strict';

    var _this = this;
    var _backup = null;

    Trux.call(this);

    this.data = null;
    this.backup = null;
    this._name = name;
    this.collection = false;
    this.className = 'TruxModel';

    /**
     * Set the data for this TruxModel instance.
     * Also sets the private _backup for this instance.
     * @param object {data} - the data that defines this model
     * @return void
     */
    this.setData = function (data) {
        this.data = data;
        _backup = JSON.parse(JSON.stringify(data));
    };

    /**
     * Restores the model's data from the privately stored _backup.
     * @return void
     */
    this.restoreData = function () {
        this.data = JSON.parse(JSON.stringify(_backup));
    };

    /**
     * Gets the id for this model.
     * @return mixed {id} - the model's unique id
     */
    this.getId = function () {
        return this.data.id;
    };

    /**
     * Requests the remote data for the model, then sets the TruxModel data with the response
     * @implements qwest.get
     * @param object {options} - optional onDone and onFail methods to run when promises are resolved
     * @return void
     */
    this.fetch = function (options) {
        qwest.get(this.GET)
        .then(function (xhr, response) {
            if (typeof response !== 'object') return;

            _this.setData(response);

            if (typeof options.onDone === 'function') {
                options.onDone();
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
     * @implements qwest.post
     * @param object {data} - the data for the new model
     * @param object {options} - optional onDone and onFail methods to run once promises are resolved
     * @return void
     */
    this.create = function (data, options) {
        qwest.post(this.POST, data)
        .then(function (xhr, response) {
            if (typeof response !== 'object') return;

            _this.setData(response);

            if (typeof options.onDone === 'function') {
                options.onDone();
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
     * @implements qwest.put
     * @implements EventEmitter.emitEvent
     * @param object {data} - the new data for the model
     * @param object {options} - optional onDone and onFail methods to run once promises are resolved
     * @return void
     */
    this.update = function (data, options) {
        qwest.put(this.PUT, data)
        .then(function (xhr, response) {
            if (typeof response !== 'object') return;

            _this.setData(response);

            if (_this.collection) {
                _this.collection.emitChangeEvent();
            } else {
                _this.emitChangeEvent();
            }

            if (typeof options.onDone === 'function') {
                options.onDone();
            }
        })
        .catch(function (xhr, response, e) {
            _this.restoreData();

            if (_this.collection) {
                _this.collection.emitChangeEvent();
            } else {
                _this.emitChangeEvent();
            }

            if (typeof options.onFail === 'function') {
                options.onFail();
            }
        });
    };

    /**
     * Caches this model's data in local storage.
     * @return void
     */
    this.cache = function () {
        localStorage.setItem(_this._name, JSON.stringify(_this.data));
    };

    /**
     * Clears this model's data property and removes the data from local storage.
     * @return void
     */
    this.purge = function () {
        this.data = null;
        localStorage.removeItem(_this._name);
    };
};
