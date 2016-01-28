(function () {
    'use strict';
    /**
     * A store for an array of models.
     *
     * @param {String} name - the name of this Collection
     * @param {Function} modelConstructor - a constructor for a Model
     * @return {Object} this - this Collection
     * @example
       //basic usage
       var MyCollection = new Collection('My Collection', Model);
     * @example
       //advanced usage
       var MyCollection = function () {
           Collection.call(this);

           this.getCategories = function () {
               categories = [];

               this.models.forEach(function (item) {
                   categories.push(item.data.category);
               });

               return categories;
           };
       };
     * @constructor
     */
    function Collection(modelConstructor) {

        Trux.Base.call(this);

        /**
         * Private reference to this Model instance.
         *
         * @prop {Object} _this - private reference to this instance
         * @private
         */
        var _this = this;

        /**
         * The Model class for the models contained within this collection.
         *
         * @prop {Object} modelConstructor - the Model class for the models contained within this collection
         */
        this.modelConstructor = modelConstructor;

        /**
         * The array of Models stored in this Collection.
         *
         * @prop {Array} models - an array of Models
         */
        this.models = [];

        /**
         * An easy way of determining what kind of class this is.
         *
         * @prop {String} className -  easy way of determining what kind of class this is
         */
        this.className = 'Collection';

        return this;
    }

    /**
     * Requests a collection from a remote store.
     *
     * @implements qwest.get
     * @param object {options} - optional options containing possible onDone and onFail methods
     * @return void
     */
    Collection.prototype.fetch = function(options) {
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
     * Instantiates a Model for each data item contained with in the models param.
     * Appends these models into the data property of this Collection instance.
     *
     * @param {Array} models - an array of JSON objects, each object must have an id property
     * @return {Object} _this - object instance
     */
    Collection.prototype.setModels = function (models) {
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
    Collection.prototype.findById = function (id) {
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
     * Appends a model to the data property of this Collection instance.
     *
     * @param {Object} model - a Model instance
     * @return void
     */
    Collection.prototype.append = function (model) {
        model.collection = this;
        _this.models.push(model);
    };

    /**
     * Prepends a model to the data property of this Collection instance.
     *
     * @param {Object} model - a Model instance
     * @return void
     */
    Collection.prototype.prepend = function (model) {
        model.collection = _this;
        _this.models.unshift(model);
    };

    /**
     * Removes the collection's models from this instance.
     *
     * @return void
     */
    Collection.prototype.purgeModels = function () {
        this.models = [];
    };
}.call(Trux));
