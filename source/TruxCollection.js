 /**
  * A store for an array of models.
  *
  * @param {String} name - the name of this TruxCollection
  * @param {Function} modelConstructor - a constructor for a TruxModel
  * @return {Object} this - this TruxCollection
  * @example
    //basic usage
    var MyModel = new TruxModel('My Model');
    var MyCollection = new TruxCollection('My Collection', MyModel);
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
    this.request = function(options) {
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
