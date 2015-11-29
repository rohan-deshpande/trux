var Trux = function () {
    'use strict';

    var _this = this;
    var ls = localStorage;

    this.components = {};
    this.emitter = new EventEmitter();
    this.GET = false;
    this.POST = false;
    this.PUT = false;
    this.PATCH = false;
    this.DELETE = false;

    this.emitter.addListener('change', broadcast);

    function broadcast() {
        if (!Object.keys(_this.components).length) return;

        for (var prop in _this.components) {
            if(_this.components.hasOwnProperty(prop)) {
                _this.components[prop].appDataDidChange();
            }
        }
    }

    this.bindComponent = function (component) {
        _this.components[component.componentId] = component;
    };

    this.unbindComponent = function (component) {
        if (typeof _this.components[component.componentId] === 'undefined') return;

        delete _this.components[component.componentId];
    };

    this.emitChangeEvent = function () {
        _this.emitter.emitEvent('change');
    };
};

var TruxCollection = function (name, modelClass) {
    'use strict';

    Trux.call(this);

    this.collectionName = name;
    this.modelClass = modelClass;
    this.models = [];

    this.setModels = function (models) {
        if(!Array.isArray(models)) return;

        _this.purge();

        var length = models.length;
        var i;

        for (i = 0 ; i < length ; i++) {
            var model = new _this.modelClass(models[i]);
            _this.append(model);
        }

        return _this;
    };

    this.append = function (model) {
        model.collection = this;
        _this.models.push(model);
    };

    this.prepend = function (model) {
        model.collection = _this;
        _this.models.unshift(model);
    };

    this.cacheModels = function () {
        ls.setItem(_this.collectionName, JSON.stringify(_this.models));
    };

    this.purgeModels = function () {
        this.models = [];
        ls.removeItem(_this.collectionName);
    };
};

var TruxModel = function (name) {
    'use strict';

    Trux.call(this);

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
