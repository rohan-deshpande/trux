var Trux = function () {
    var _this = this;
    var proto = this.prototype;
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

    proto.bindComponent = function (component) {
        _this.components[component.componentId] = component;
    };

    proto.unbindComponent = function (component) {
        if (typeof _this.components[component.componentId] === 'undefined') return;

        delete _this.components[component.componentId];
    };

    proto.emitChangeEvent = function () {
        _this.emitter.emitEvent('change');
    };
};
