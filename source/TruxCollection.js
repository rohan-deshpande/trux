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
