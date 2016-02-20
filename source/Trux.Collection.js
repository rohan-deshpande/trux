(function (Trux) {
    'use strict';
    /**
     * A store for an array of models.
     *
     * @param {String} name - the name of this Collection
     * @param {Function} modelConstructor - a constructor for a Model
     * @return {Object} this - this Collection
     * @example
       //basic usage
       var MyCollection = new Trux.Collection(Trux.Model);
     * @example
       //advanced usage
       Trux.collections.Posts = Trux.extend({
            getCategories: function () {
                categories = [];

                this.models.forEach(function (model) {
                    categories.push(model.getCategory()); // getCategory would be a custom method on the Post model.
                });

                return categories;
            }
       }, false, Trux.Collection);

       var Blog = new Trux.collections.Posts(Trux.models.Post); //assumes you've created a custom Post model.

       console.log(Blog.getCategories()); // logs all your post's categories.
     * @constructor
     */
    Trux.Collection = function (modelConstructor) {

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
        this.className = 'TruxCollection';

        return this;
    };

    /**
     * Inherit prototype methods from Trux.Base.
     *
     */
    Trux.Collection.prototype = Object.create(Trux.Base.prototype);

    /**
     * Requests a collection from a remote store.
     *
     * @implements qwest.get
     * @param {Object} options - optional options containing possible onDone and onFail methods
     * @return {Object} _this - class instance
     */
    Trux.Collection.prototype.fetch = function(options) {
        var _this = this;

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

        return this;
    };

    /**
     * Sets the models for this collection.
     * Instantiates a Model for each data item contained with in the models param.
     * Appends these models into the data property of this Collection instance.
     *
     * @param {Array} models - an array of JSON objects, each object must have an id property
     * @return {Object} _this - class instance
     */
    Trux.Collection.prototype.setModels = function (models) {

        if(!Array.isArray(models)) return;

        this.purgeModels();

        var length = models.length;
        var i;

        for (i = 0 ; i < length ; i++) {
            var model = new this.modelConstructor(models[i]);
            this.append(model);
        }

        return this;
    };

    /**
     * Appends a model to the data property of this Collection instance.
     *
     * @param {Object} model - a Model instance
     * @return void
     */
    Trux.Collection.prototype.append = function (model) {
        model.collection = this;
        this.models.push(model);
    };

    /**
     * Prepends a model to the data property of this Collection instance.
     *
     * @param {Object} model - a Model instance
     * @return void
     */
    Trux.Collection.prototype.prepend = function (model) {
        model.collection = this;
        this.models.unshift(model);
    };

    /**
     * Removes the collection's models from this instance.
     *
     * @return void
     */
    Trux.Collection.prototype.purgeModels = function () {
        this.models = [];
    };

    /**
     * Extends Trux.Collection and returns the constructor for the new class.
     *
     * @param {Object} props - custom props for the new class
     * @param {Boolean|Function} setup - an optional function to run within the new class' constructor
     * @return {Function} TruxCollection - the new constructor
     */
    Trux.Collection.extend = function (props, setup) {
        var TruxCollection = function (modelConstructor) {
            Trux.Collection.call(this, modelConstructor);

            if (typeof setup === 'function') {
                setup(this);
            }
        };

        TruxCollection.prototype = Object.create(Trux.Collection.prototype);

        if (typeof props !== 'object') return TruxCollection;

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                TruxCollection.prototype[prop] = props[prop];
            }
        }

        return TruxCollection;
    };
}(Trux));
