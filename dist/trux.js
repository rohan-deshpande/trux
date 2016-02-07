(function () {
    'use strict';

    /**
     * The Trux namespace.
     *
     * @namespace
     * @global
     */
    this.Trux = {
        /**
         * Extends a base class and returns a new class.
         * If no base parameter is passed, Trux.Model is assumed.
         *
         * @param {Object} props - custom props for the new class
         * @param {Boolean|Function} setup - an optional function to run within the new class' constructor
         * @param {Function} base - the base constructor to create this sub class from
         * @return {Function} _constructor - the new constructor
         */
        extend: function (props, setup, base) {
            var _base = (typeof base === 'function') ? base : Trux.Model;
            var TruxClassExtension = function (arg) {
                _base.call(this, arg);

                if (typeof setup === 'function') {
                    setup(this);
                }
            };

            TruxClassExtension.prototype = Object.create(_base.prototype);

            if (typeof props !== 'object') return TruxClassExtension;

            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    TruxClassExtension.prototype[prop] = props[prop];
                }
            }

            return TruxClassExtension;
        },

        /**
         * Store for custom Trux Model classes.
         *
         * @prop {Object} models - an object to store custom Trux Model classes
         */
        models: {},

        /**
         * Store for custom Trux Collection classes.
         *
         * @prop {Object} collections - an object to store custom Trux Collection classes
         */
        collections: {},

        /**
         * The base constructor for models and collections.
         *
         * @constructor
         */
        Base: function () {

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
             * The base Event Emitter
             *
             * @prop {Object} emitter - the model's Event Emitter
             */
            this.emitter = new EventEmitter();

            /**
             * Add the change event listener to the Event Emitter
             *
             */
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
        }
    };

    /**
     * Bind a React component to this Trux instance.
     * Bound components receive updates via this.broadcast.
     * Each component is required to have a unique truxId property set.
     * Should be called within the component's componentWillMount or componentDidMount methods.
     *
     * @param {Object} component - the React class to bind to this instance
     * @return void
     */
    Trux.Base.prototype.bindComponent = function (component) {
        this.components[component.truxId] = component;
    };

    /**
     * Unbinds a React component from this Trux instance.
     * Stops the component from receiving updates.
     * Should be called within the component's componentWillUnmount method.
     *
     * @param {Object} component - the React class to unbind from this instance
     * @return void
     */
    Trux.Base.prototype.unbindComponent = function (component) {
        if (typeof this.components[component.truxId] === 'undefined') return;

        delete this.components[component.truxId];
    };

    /**
     * Emits a change event from this Trux instance.
     *
     * @implements EventEmitter.emitEvent
     * @fires this.emitter.change
     * @return void
     */
    Trux.Base.prototype.emitChangeEvent = function () {
        this.emitter.emitEvent('change');
    };

    /**
     * Sets the options for the request.
     *
     * @param {Object} requestOptions - the options for all requests
     * @return {Object} this - this Trux class instance
     */
    Trux.Base.prototype.setRequestOptions = function (requestOptions) {
        this.requestOptions = requestOptions;

        return this;
    };
}.call(this));

(function (Trux) {
    'use strict';

    /**
     * A client side interface for a remote data Model.
     *
     * @param {Object} data - the data which defines this Model
     * @return {Object} this - this Model
     * @example
       //basic usage
       var MyModel = new Trux.Model({message:'hello world'});
     * @example
       //advanced usage
       Trux.models.User = Trux.extend({
            getName: function () {
                return this.data.name;
            }
       }, false);

       var Frodo = new Trux.models.User({name:'Frodo Baggins'});

       console.log(Frodo.getName()); // logs 'Frodo Baggins'
     * @constructor
     */
    Trux.Model = function (data) {

        /**
         * Inherit properties from Trux.Base.
         *
         */
        Trux.Base.call(this);

        /**
         * Private reference to this Model instance.
         *
         * @prop {Object} _this - private reference to this instance
         * @private
         */
        var _this = this;

        /**
         * Private backup of the Model's data, initially null.
         *
         * @prop {Null|Object} _this -  private backup of the Model's data, initially null
         * @private
         */
        var _backup = null;

        /**
         * The data which defines this Model, initially null.
         *
         * @prop {Null|Object} data - the data which defines this Model, initially null
         */
        this.data = data;

        /**
         * A public backup of this Model's data, initially null.
         *
         * @prop {Null|Object} backup - a public backup of this Model's data, initially null
         */
        this.backup = null;

        /**
         * The collection this Model belongs to, if it does belong to one. Initially false.
         *
         * @prop {Boolean|Object} collection - the collection this Model belongs to
         */
        this.collection = false;

        /**
         * Easy way of determining what kind of class this is.
         *
         * @prop {String} className - easy way of determining what kind of class this is
         */
        this.className = 'TruxModel';

        /**
         * Set the data for this Model instance.
         * Also sets the private _backup for this instance.
         *
         * @param {Object} data - the data that defines this Model
         * @return {Object} this - this Model
         */
        this.setData = function (data) {
            this.data = data;
            _backup = JSON.parse(JSON.stringify(data));
            return this;
        };

        /**
         * Restores the Model's data from the privately stored _backup.
         *
         * @return {Object} this - this Model
         */
        this.restoreData = function () {
            this.data = JSON.parse(JSON.stringify(_backup));
            return this;
        };

        return this;
    };

    /**
     * Inherit prototype methods from Trux.Base.
     *
     */
    Trux.Model.prototype = Object.create(Trux.Base.prototype);

    /**
     * Persits the Model's data throughout its bound components.
     * Emits either the Model's change event or, if it belongs to a Collection, the Collection's change event.
     *
     * @return {Object} this - this Model
     */
    Trux.Model.prototype.persist = function () {
        if (this.collection) {
            this.collection.emitChangeEvent();
        } else {
            this.emitChangeEvent();
        }

        return this;
    };

    /**
     * Requests the remote data for the Model, then sets the Model data with the response.
     *
     * @implements qwest.get
     * @param {Object} options - optional onDone and onFail methods to run when promises are resolved
     * @return {Object} this - this Trux class instance
     */
    Trux.Model.prototype.fetch = function (options) {
        var _this = this;

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

        return this;
    };

    /**
     * Creates a new instance of this Model in the remote data store.
     *
     * @implements qwest.post
     * @param {Object} data - the data for the new Model
     * @param {Object} options - optional onDone and onFail methods to run once promises are resolved
     * @return {Object} this - this Trux class instance
     */
    Trux.Model.prototype.create = function (data, options) {
        var _this = this;

        qwest.post(this.POST, data, this.requestOptions)
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

        return this;
    };

    /**
     * Updates this Model in the remote data store.
     *
     * @implements qwest.put
     * @implements EventEmitter.emitEvent
     * @param {Object} data - the new data for the Model
     * @param {Object} options - optional onDone and onFail methods to run once promises are resolved
     * @return {Object} this - this Trux class instance
     */
    Trux.Model.prototype.update = function (data, options) {
        var _this = this;

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

        return this;
    };

    /**
     * Clears this Model's data property.
     *
     * @return void
     */
    Trux.Model.prototype.purge = function () {
        this.data = null;
    };

}(Trux));

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
        model.collection = _this;
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
}(Trux));
