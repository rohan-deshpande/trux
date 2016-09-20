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
         * Private backup of the Model's data.
         * Will store an empty object if no data was passed to the constructor.
         *
         * @prop {Object} _backup - private backup of the Model's data
         * @private
         */
        var _backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));

        /**
         * The data which defines this Model, initially null.
         *
         * @prop {Null|Object} data - the data which defines this Model, initially null
         */
        this.data = data;

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
            _backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));
        };

        /**
         * Restores the Model's data from the privately stored _backup.
         *
         * @return {Object} this - this Model
         */
        this.restoreData = function () {
            this.data = (!_backup || Object.keys(_backup).length === 0) ? {} : JSON.parse(JSON.stringify(_backup));
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
     * Emits either the Model's change event or, if it belongs to a Collection, performs logic to either fetch the collection or simply update its bound components.
     *
     * @return void
     */
    Trux.Model.prototype.persist = function () {
        var collection = this.collection;

        if (collection && collection.sync === true) {
            collection.fetch({
                onDone: function () {
                    collection.emitChangeEvent();
                }
            });
        } else if (collection && collection.sync === false) {
            collection.emitChangeEvent();

        }

        this.emitChangeEvent();
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

                if (options && options.onDone) {
                    options.onDone(response);
                }
            })
            .catch(function (e, xhr, response) {
                if (options && options.onFail) {
                    options.onFail(e, xhr, response);
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

                if (options && options.onDone) {
                    options.onDone(response);
                }
            })
            .catch(function (e, xhr, response) {
                if (options && options.onFail) {
                    options.onFail(e, xhr, response);
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

                _this.setData(response);
                _this.persist();

                if (options && options.onDone) {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                _this.restoreData();
                _this.persist();

                if (options && options.onFail) {
                    options.onFail(e, xhr, response);
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

    /**
     * Extends Trux.Model and returns the constructor for the new class.
     *
     * @param {Object} props - custom props for the new class
     * @param {Boolean|Function} setup - an optional function to run within the new class' constructor
     * @return {Function} TruxModel - the new constructor
     */
    Trux.Model.extend = function (props, setup) {
        var TruxModel = function (data) {
            Trux.Model.call(this, data);

            if (typeof setup === 'function') {
                setup(this);
            }
        };

        TruxModel.prototype = Object.create(Trux.Model.prototype);

        if (typeof props !== 'object') return TruxModel;

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                TruxModel.prototype[prop] = props[prop];
            }
        }

        return TruxModel;
    };

    /**
     * Modifies the Trux.Model class with the passed properties.
     * This will enable all custom models to inherit the properties passed to this method.
     *
     * @param {Object} props - the props to add to the Trux.Model class
     * @return {Object} this - class instance
     */
    Trux.Model.modify = function (props) {
        if (typeof props !== 'object') return this;

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                Trux.Model.prototype[prop] = props[prop];
            }
        }

        return this;
    };
}(Trux));
