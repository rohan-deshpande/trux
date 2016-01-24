 /**
  * A client side interface for a remote data model.
  * NOTE Trux Models assume that the remote data each model mirrors has a unique `id` property.
  *
  * @param {String} name - the name of this TruxModel
  * @return {Object} this - this TruxModel
  * @example
    //basic usage
    var MyModel = new TruxModel('My Model');
  * @example
    //expected usage
    var UserModel = function(data) {
        TruxModel.call(this, data.name);

        this.prototype = TruxModel;
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
     * Set the name of this model.
     *
     * @prop {String} name - the name of this model
     */
    this.setName = function (name) {
        this.name = name;
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
                    options.onFail();
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
