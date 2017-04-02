import EventEmitter from 'EventEmitter';

export default class Store {
  constructor() {
    /**
     * Private reference to this store
     *
     * @prop {object} store - private reference to this store
     * @private
     */
    const store = this;

    /**
     * Reference for bound components
     *
     * @prop {object} components - reference for bound components
     */
    this.components = {};

    /**
     * The base Event Emitter
     *
     * @prop {object} emitter - the model's Event Emitter
     */
    this.emitter = new EventEmitter();

    /**
     * Headers to be sent with the request
     *
     * @prop {object} requestHeaders - request headers
     */
    this.requestHeaders = {};

    /**
     * The GET route for this object
     *
     * @prop {string} GET - the GET route for this object
     */
    this.GET = false;

    /**
     * The POST route for this object
     *
     * @prop {string} POST - the POST route for this object
     */
    this.POST = false;

    /**
     * The PUT route for this object
     * @prop {string} PUT - the PUT route for this object
     *
     */
    this.PUT = false;

    /**
     * The PATCH route for this object
     *
     * @prop {string} PATCH - the PATCH route for this object
     */
    this.PATCH = false;

    /**
     * The DELETE route for this object
     *
     * @prop {string} DELETE - the DELETE route for this object
     */
    this.DELETE = false;

    /**
     * Broadcast changes to all bound components.
     *
     * @private
     * @return void
     */
    function broadcast() {
      if (!Object.keys(store.components).length) {
        return;
      }

      for (var prop in store.components) {
        if (store.components.hasOwnProperty(prop)) {
          store.components[prop].storeDataDidChange();
        }
      }
    }

    this.emitter.addListener('change', broadcast);
  }

  /**
   * Bind a component to this store.
   * Bound components receive updates via broadcast.
   * Each component is required to have a unique truxId property set.
   *
   * @NOTE for react, this should be called within the component's componentWillMount or componentDidMount methods.
   *
   * @param {object} component - the  class to bind to this instance
   * @return void
   */
  bindComponent(component) {
    this.components[component.truxId] = component;
  }

  /**
   * Unbinds a component from this store.
   * Stops the component from receiving updates.
   *
   * @NOTE for react, this should be called within the component's componentWillUnmount method.
   *
   * @param {object} component - the React class to unbind from this instance
   * @return void
   */
  unbindComponent(component) {
    if (typeof this.components[component.truxId] === 'undefined') return;

    delete this.components[component.truxId];
  }

  /**
   * Emits a change event from this store.
   *
   * @fires this.emitter.change
   * @return void
   */
  emitChangeEvent() {
    this.emitter.emitEvent('change');
  }

  /**
   * Set the store's request headers.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers
   * @param {object} headers - headers object
   */
  set requestHeaders(headers) {
    this.requestHeaders = headers;

    return this;
  }
}
