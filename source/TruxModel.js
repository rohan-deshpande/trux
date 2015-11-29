var TruxModel = function (name) {
    'use strict';
    
    Trux.call(this);
    this.prototype = Trux;

    var _backup = null;

    this.data = null;
    this.backup = null;
    this.modelName = name;
    this.collection = false;

    this.setData = function (data) {
        this.data = data;
        _backup = JSON.parse(JSON.stringify(data));
    };

    this.restoreData = function () {
        this.data = JSON.parse(JSON.stringify(_backup));
    };

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

    this.cache = function () {

    };

    this.purge = function () {

    };
};
