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
