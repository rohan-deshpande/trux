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
     * Clears this Model's data property.
     *
     * @return void
     */
    Trux.Model.prototype.purge = function () {
        this.data = null;
    };

}(Trux));
