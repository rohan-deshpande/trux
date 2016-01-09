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
