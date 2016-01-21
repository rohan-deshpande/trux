 /**
  * The base object for any TruxModel or TruxCollection.
  *
  * @global
  * @class
  */
var Trux = function () {
    'use strict';

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
     * The model's Event Emitter
     *
     * @prop {Object} emitter - the model's Event Emitter
     */
    this.emitter = new EventEmitter();

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
     * Bind a React component to this Trux instance.
     * Bound components receive updates via this.broadcast.
     * Each component is required to have a unique truxId property set.
     * Should be called within the component's componentWillMount or componentDidMount methods.
     *
     * @param {Object} component - the React class to bind to this instance
     * @return void
     */
    this.bindComponent = function (component) {
        _this.components[component.truxId] = component;
    };

    /**
     * Unbinds a React component from this Trux instance.
     * Stops the component from receiving updates.
     * Should be called within the component's componentWillUnmount method.
     *
     * @param {Object} component - the React class to unbind from this instance
     * @return void
     */
    this.unbindComponent = function (component) {
        if (typeof _this.components[component.truxId] === 'undefined') return;

        delete _this.components[component.truxId];
    };

    /**
     * Emits a change event from this Trux instance.
     *
     * @implements EventEmitter.emitEvent
     * @fires this.emitter.change
     * @return void
     */
    this.emitChangeEvent = function () {
        _this.emitter.emitEvent('change');
    };
};
