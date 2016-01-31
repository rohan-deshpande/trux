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
         * Convenience for enabling prototypal inheritance.
         *
         * @param {Function} base - the base class from which to extend
         * @param {Function} extension - the extended class which inherits from base
         * @return void
         */
        branch: function (base, extension) {
            extension.prototype = Object.create(base.prototype);
        },

        /**
         * Store for custom Trux Model classes.
         *
         * @prop {Object} models - an object to store custom Trux Model classes
         */
        models:{},

        /**
         * Store for custom Trux Collection classes.
         *
         * @prop {Object} collections - an object to store custom Trux Collection classes
         */
        collections:{},

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
     * Extends the base methods of this Trux class instance.
     * Use this if you want a generic Trux.Model or Trux.Collection with custom methods.
     *
     * @param {Object} methods - the custom methods to set on this instance
     * @return {Object} this - this Trux class instance
     */
    Trux.Base.prototype.extend = function (methods) {
        if (typeof methods !== 'object') return this;

        for (var fn in methods) {
            if (methods.hasOwnProperty(fn) && typeof(methods[fn]) === 'function') {
                this[fn] = methods[fn];
            }
        }

        return this;
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
     * <p>Each Model is expected to have a unique <em>id</em> property.</p>
     *
     * @param {Object} data - the data which defines this Model
     * @return {Object} this - this Model
     * @example
       //basic usage
       var MyModel = new Trux.Model({message:'hello world'});
     * @example
       //advanced usage
       Trux.models.User = function(data) {
           Trux.Model.call(this);
       }

       Trux.models.User.prototype.getName = function () {
            return this.data.name;
       }

       Trux.models.User.prototype.setName = function () {
            this.data.name = name;
       }

       Trux.branch(Trux.Model, Trux.models.User);

       var user = new Trux.models.User({name:'Frodo Baggins'});
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
         * The Model's unique id.
         *
         * @prop {Null|String|Number} id - the Model's unique id
         */
        this.id = null;

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
        this.className = 'Model';

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
     * Set the id for the Model.
     *
     * @prop {String|Number} id - the id of this Model
     * @return {Object} this - this Model
     */
     Trux.Model.prototype.setId = function (id) {
         this.id = id;
         return this;
     };

    /**
     * Gets the id for this Model.
     *
     * @return {Integer|String} id - the Model's unique id
     */
    Trux.Model.prototype.getId = function () {
        return this.data.id;
    };

    /**
     * Persits the Model's data throughout its bound components.
     * Emits the Model's change event.
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
     * Polls the remote data store.
     *
     * @implements qwest.get
     * @param {Boolean|Undefined} poll - true when first starting to poll, undefined while in recursion
     * @return void
     */
    Trux.Model.prototype.startPolling = function (poll) {
        if (poll === true) this.poll = true;

        var _this = this;

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
     * @return {Object} this - this Model
     */
    Trux.Model.prototype.stopPolling = function () {
        this.poll = false;

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
       Trux.collections.Posts = function () {
           Trux.Collection.call(this, Trux.models.Post); //assumes you have created a custom Trux.Model - Post
       };

       Trux.collections.Posts.prototype.getCategories = function () {
           categories = [];

           this.models.forEach(function (model) {
               categories.push(model.getCategory()); // getCategory would be a custom method on the Post model.
           });

           return categories;
       }
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
        this.className = 'Collection';

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
     * Finds a model contained within this collection via its unique id.
     *
     * @param {Integer|String} id - a unique id which corresponds to a model stored in this collection
     * @return {Object|Boolean} model - an object if the model was found, false if not
     */
    Trux.Collection.prototype.findById = function (id) {
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
