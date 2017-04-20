import EventEmitter from 'wolfy87-eventemitter';

export default class Store {
  constructor() {
    /**
     * Private reference to this store
     *
     * @private
     * @prop {object}
     */
    const store = this;

    /**
     * Reference for connected components
     *
     * @prop {object}
     */
    this.components = {};

    /**
     * The store's Event Emitter
     *
     * @prop {object}
     */
    this.emitter = new EventEmitter();

    /**
     * Headers to be sent with the request
     *
     * @prop {object}
     */
    this.requestHeaders = {
      'Content-Type': 'application/json',
    };

    /**
     * The GET route for the store
     *
     * @prop {string}
     */
    this.GET = '';

    /**
     * The POST route for the store
     *
     * @prop {string}
     */
    this.POST = '';

    /**
     * The PUT route for the store
     *
     * @prop {string}
     */
    this.PUT = '';

    /**
     * The PATCH route for the store
     *
     * @prop {string}
     */
    this.PATCH = '';

    /**
     * The DELETE route for the store
     *
     * @prop {string}
     */
    this.DELETE = '';

    /**
     * Boolean to determine if the store has been fetched from the remote resource.
     *
     * @prop {boolean}
     */
    this.wasFetched = false;

    /**
     * Broadcast changes to all connected components.
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
   * Connects a component to the store and ensures the component receives updates via broadcast.
   * Throws a ReferenceError if the component does not have a truxid defined and triggers a
   * console warning if the component does not have a storeDidUpdate method.
   *
   * @NOTE For React, this should be called within the component's componentDidMount method.
   *
   * @param {object} component - the component to connect to this store
   * @throws ReferenceError - if component.truxid is undefined
   * @return void
   */
  connect(component) {
    if (typeof component.truxid === 'undefined') {
      throw new ReferenceError('You must set a truxid on your component before connecting it to a store.');
    }

    this.components[component.truxid] = component;

    if (typeof component.storeDidUpdate !== 'function') {
      console.warn('The component you have connected to this store does not contain a storeDidUpdate method.');
    }
  }

  /**
   * Disconnects a component from the store, stopping it from receiving updates.
   *
   * @NOTE For React, this should be called within the component's componentWillUnmount method.
   *
   * @param {object} component - the component to disconnect from this store
   * @throws ReferenceError - if component.truxid is undefined
   * @return void
   */
  disconnect(component) {
    if (typeof this.components[component.truxid] === 'undefined') {
      throw new ReferenceError('The component you are attempting to disconnect is not connected to this store.');
    }

    delete this.components[component.truxid];
  }

  /**
   * Disconnects all components from the store.
   *
   * @return {object} Store
   */
  close() {
    for (let truxid in this.components) {
      if (this.components.hasOwnProperty(truxid)) {
        delete this.components[truxid];
      }
    }

    return this;
  }

  /**
   * Emits a change event from the store.
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
   * Sets the wasFetched boolean and wasFetchedAt timestamp properties.
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
