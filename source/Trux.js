(function () {
    'use strict';

    /**
     * The Trux namespace.
     *
     * @namespace
     * @global
     */
    this.Trux = {
        /**
         * Creates a new sub class from the optional base parameter.
         * If no base parameter is passed, Trux.Model is assumed.
         *
         * @param {Object} props - custom props for the new class
         * @param {Function} base - the base constructor to create this sub class from
         * @return {Function} _constructor - the new constructor
         */
        createSubClass: function (props, base) {
            var _base = (typeof base === 'function') ? base : Trux.Model;
            var TruxSubClass = function (arg) {
                _base.call(this, arg);
            };

            TruxSubClass.prototype = Object.create(_base.prototype);

            if (typeof props !== 'object') return TruxSubClass;

            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    TruxSubClass.prototype[prop] = props[prop];
                }
            }

            return TruxSubClass;
        },

        /**
         * Store for custom Trux Model classes.
         *
         * @prop {Object} models - an object to store custom Trux Model classes
         */
        models:{},

        /**
         * Store for custom Trux Collection classes.
         *
         * @prop {Object} collections - an object to store custom Trux Collection classes
         */
        collections:{},

        /**
         * The base constructor for models and collections.
         *
         * @constructor
         */
        Base: function () {

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
             * The base Event Emitter
             *
             * @prop {Object} emitter - the model's Event Emitter
             */
            this.emitter = new EventEmitter();

            /**
             * Add the change event listener to the Event Emitter
             *
             */
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
             * Request options which align with the qwest options argument for requests.
             *
             * @see https://github.com/pyrsmk/qwest#basics
             * @prop {Object} requestOptions - options to be set for the request
             */
            this.requestOptions = {};

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
        }
    };

    /**
     * Bind a React component to this Trux instance.
     * Bound components receive updates via this.broadcast.
     * Each component is required to have a unique truxId property set.
     * Should be called within the component's componentWillMount or componentDidMount methods.
     *
     * @param {Object} component - the React class to bind to this instance
     * @return void
     */
    Trux.Base.prototype.bindComponent = function (component) {
        this.components[component.truxId] = component;
    };

    /**
     * Unbinds a React component from this Trux instance.
     * Stops the component from receiving updates.
     * Should be called within the component's componentWillUnmount method.
     *
     * @param {Object} component - the React class to unbind from this instance
     * @return void
     */
    Trux.Base.prototype.unbindComponent = function (component) {
        if (typeof this.components[component.truxId] === 'undefined') return;

        delete this.components[component.truxId];
    };

    /**
     * Emits a change event from this Trux instance.
     *
     * @implements EventEmitter.emitEvent
     * @fires this.emitter.change
     * @return void
     */
    Trux.Base.prototype.emitChangeEvent = function () {
        this.emitter.emitEvent('change');
    };

    /**
     * Sets the options for the request.
     *
     * @param {Object} requestOptions - the options for all requests
     * @return {Object} this - this Trux class instance
     */
    Trux.Base.prototype.setRequestOptions = function (requestOptions) {
        this.requestOptions = requestOptions;

        return this;
    };
}.call(this));
