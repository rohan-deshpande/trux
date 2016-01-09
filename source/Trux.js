/**
 * Trux - the base object for any TruxModel or TruxCollection.
 *
 * @var object {_this} - private reference to this instance.
 * @property object {components} - object reference for bound React components.
 * @property object {emitter} - the model's event emitter.
 * @property string {GET} - the GET route for this instance.
 * @property string {POST} - the POST route for this instance.
 * @property string {PUT} - the PUT route for this instance.
 */
var Trux = function () {
    'use strict';

    var _this = this;

    this.components = {};
    this.emitter = new EventEmitter();
    this.GET = false;
    this.POST = false;
    this.PUT = false;
    this.PATCH = false;
    this.DELETE = false;

    this.emitter.addListener('change', broadcast);

    /**
     * Broadcast changes to all bound React components.
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
     * Bind a React component to this Trux instance.
     * Bound components receive updates via this.broadcast.
     * Each component is required to have a unique truxId property set.
     * Should be called within the component's componentWillMount or componentDidMount methods.
     * @param React class {component} - the React class to bind to this instance
     * @return void
     */
    this.bindComponent = function (component) {
        _this.components[component.truxId] = component;
    };

    /**
     * Unbinds a React component from this Trux instance.
     * Stops the component from receiving updates.
     * Should be called within the component's componentWillUnmount method.
     * @param React class {component} - the React class to unbind from this instance
     * @return void
     */
    this.unbindComponent = function (component) {
        if (typeof _this.components[component.truxId] === 'undefined') return;

        delete _this.components[component.truxId];
    };

    /**
     * Emits a change event from this Trux instance.
     * @implements EventEmitter.emitEvent
     * @return void
     */
    this.emitChangeEvent = function () {
        _this.emitter.emitEvent('change');
    };
};
