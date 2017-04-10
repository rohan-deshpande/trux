import EventEmitter from 'wolfy87-eventemitter';

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
    this.requestHeaders = {
      'Content-Type': 'application/json',
    };

    /**
     * The GET route for this object
     *
     * @prop {string} GET - the GET route for this object
     */
    this.GET = '';

    /**
     * The POST route for this object
     *
     * @prop {string} POST - the POST route for this object
     */
    this.POST = '';

    /**
     * The PUT route for this object
     * @prop {string} PUT - the PUT route for this object
     *
     */
    this.PUT = '';

    /**
     * The PATCH route for this object
     *
     * @prop {string} PATCH - the PATCH route for this object
     */
    this.PATCH = '';

    /**
     * The DELETE route for this object
     *
     * @prop {string} DELETE - the DELETE route for this object
     */
    this.DELETE = '';

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

      for (let prop in store.components) {
        if (store.components.hasOwnProperty(prop)) {
          store.components[prop].storeDidUpdate();
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

    if (typeof component.storeDidUpdate !== 'function') {
      console.warn('The component you have bound to this store does not contain a storeDidUpdate method');
    }
  }

  /**
   * Unbinds a component from this store.
   * Stops the component from receiving updates.
   *
   * @NOTE for react, this should be called within the component's componentWillUnmount method.
   *
   * @param {object} component - the React class to unbind from this instance
   * @throws Error
   * @return void
   */
  unbindComponent(component) {
    if (typeof this.components[component.truxId] === 'undefined') {
      throw new Error('The component you are attempting to unbind is not bound to this store');
    }

    delete this.components[component.truxId];
  }

  /**
   * Unbinds all components from this store.
   *
   * @return {object} Store
   */
  unbindAllComponents() {
    for (let truxId in this.components) {
      if (this.components.hasOwnProperty(truxId)) {
        delete this.components[truxId];
      }
    }

    return this;
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
   * Adds a request header.
   *
   * @param {string} key - the key for the header
   * @param {mixed} value - the value for the header
   * @return {object} Store
   */
  addRequestHeader(key, value) {
    this.requestHeaders[key] = value;

    return this;
  }

  /**
   * Deletes a request header.
   *
   * @param {string} key - the key for the header to delete
   * @return {object} Store
   */
  deleteRequestHeader(key) {
    delete this.requestHeaders[key];

    return this;
  }

  /**
   * Helper to get the current unix timestamp in ms.
   *
   * @return {number}
   */
  getUnixTimestamp() {
    return Date.now();
  }

  /**
   * Set the store's request headers.
   *
   * @param {object} headers - headers object
   * @return void
   */
  set requestHeaders(headers) {
    this._requestHeaders = headers;
  }

  /**
   * Gets the store's request headers.
   *
   * @return {object}
   */
  get requestHeaders() {
    return this._requestHeaders;
  }

  /**
   * Sets the wasFetched and wasFetchedAt properties.
   *
   * @param {boolean} wasFetched
   * @return void
   */
  set wasFetched(wasFetched) {
    this._wasFetched = (wasFetched) ? true : false;
    this._wasFetchedAt = (wasFetched) ? this.getUnixTimestamp() : this.wasFetchedAt;
  }

  /**
   * Gets the wasFetched property.
   *
   * @return {boolean}
   */
  get wasFetched() {
    return this._wasFetched;
  }

  /**
   * Gets the wasFetchedAt property.
   *
   * @return {number}
   */
  get wasFetchedAt() {
    return this._wasFetchedAt;
  }
}
