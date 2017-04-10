import Store from './Store';
import Fetch from 'rd-fetch';

export default class Model extends Store {

  /**
   * A client side interface for a remote data Model.
   *
   * @param {object} data - the data which defines this Model
   * @return {object} this - this Model
   * @constructor
   */
  constructor(data) {
    super();

    let backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));

    /**
     * The data which defines this model, initially null.
     *
     * @prop {object|null} data - the data which defines this Model, initially null
     */
    this.data = data || null;

    /**
     * The collection this model belongs to, if it does belong to one. Initially false.
     *
     * @prop {boolean|object} collection - the collection this model belongs to
     */
    this.collection = false;

    /**
     * Fills the model with data.
     * Also sets the private backup for this model.
     *
     * @param {object} data - the data that defines this model
     * @return {object} Model
     */
    this.fill = (data) => {
      this.data = data;
      backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));

      return this;
    };

    /**
     * Restores the model's data from a previously stored backup.
     *
     * @return {object} Model
     */
    this.restore = () => {
      this.data = (!backup || Object.keys(backup).length === 0) ? {} : JSON.parse(JSON.stringify(backup));

      return this;
    };
  }

  /**
   * Persits the model's data throughout its bound components.
   * Emits the model's change event and, if it belongs to a collection, the collection's change event also.
   *
   * @return {object} Model
   */
  persist() {
    if (this.collection) {
      this.collection.emitChangeEvent();
    }

    this.emitChangeEvent();

    return this;
  }

  /**
   * Requests the remote data for the model, then sets the model data with the response.
   *
   * @return {Object} Promise
   */
  fetch() {
    return Fetch.json(this.GET, {
      method: 'GET',
      headers: this.requestHeaders
    }).then((response) => {
      this.wasFetched = true;
      this.fill(response.json).persist();

      return Promise.resolve(response);
    }).catch((error) => {
      this.wasFetched = false;
      return Promise.reject(error);
    });
  }

  /**
   * Creates a new model in the remote data store.
   *
   * @param {object} data - the data for the new model
   * @return {object} Promise
   */
  create(data) {
    return Fetch.json(this.POST, {
      method: 'POST',
      headers: this.requestHeaders,
      body: data
    }).then((response) => {
      this.wasCreated = true;
      this.fill(response.json).persist();

      return Promise.resolve(response);
    }).catch((error) => {
      this.wasCreated = false;

      return Promise.reject(error);
    });
  }

  /**
   * Updates the model in the remote data store.
   *
   * @param {object} data - the data to update the model with
   * @param {string} [method] - the method to use, should be either PUT or PATCH, defaults to PUT
   * @return {object} Promise
   */
  update(data, method = 'PUT') {
    return Fetch.json(this[method], {
      method: method,
      headers: this.requestHeaders,
      body: data
    }).then((response) => {
      this.wasUpdated = true;
      this.fill(response.json).persist();

      return Promise.resolve(response);
    }).catch((error) => {
      this.wasUpdated = false;
      this.restore().persist();

      return Promise.reject(error);
    });
  }

  /**
   * Deletes the model in the remote data store.
   *
   * @return {object} Promise
   */
  destroy() {
    return Fetch.json(this.DELETE, {
      method: 'DELETE',
      headers: this.requestHeaders
    }).then((response) => {
      this.wasDestroyed = true;
      this.purge().persist();

      return Promise.resolve(response);
    }).catch((error) => {
      this.wasDestroyed = false;
      this.restore().persist();

      return Promise.reject(error);
    });
  }

  /**
   * Purges the model of its data.
   *
   * @return {object} Model
   */
  purge() {
    this.data = null;

    return this;
  }

  /**
   * Sets the wasCreated and wasCreatedAt properties.
   *
   * @param {boolean} wasCreated
   * @return void
   */
  set wasCreated(wasCreated) {
    this._wasCreated = (wasCreated) ? true : false;
    this._wasCreatedAt = (wasCreated) ? this.getUnixTimestamp() : this.wasCreatedAt;
  }

  /**
   * Gets the wasCreated property.
   *
   * @return {boolean}
   */
  get wasCreated() {
    return this._wasCreated;
  }

  /**
   * Gets the wasCreatedAt timestamp.
   *
   * @return {number}
   */
  get wasCreatedAt() {
    return this._wasCreatedAt;
  }

  /**
   * Sets the wasUpdated and wasUpdatedAt properties.
   *
   * @param {boolean} wasUpdated
   * @return void
   */
  set wasUpdated(wasUpdated) {
    this._wasUpdated = (wasUpdated) ? true : false;
    this._wasUpdatedAt = (wasUpdated) ? this.getUnixTimestamp() : this.wasUpdatedAt;
  }

  /**
   * Gets the wasUpdated property.
   *
   * @return {boolean}
   */
  get wasUpdated() {
    return this._wasUpdated;
  }

  /**
   * Gets the wasUpdatedAt property.
   *
   * @return {number}
   */
  get wasUpdatedAt() {
    return this._wasUpdatedAt;
  }

  /**
   * Sets the wasDestroyed and wasDestroyedAt properties.
   *
   * @param {boolean} wasDestroyed
   * @return void
   */
  set wasDestroyed(wasDestroyed) {
    this._wasDestroyed = (wasDestroyed) ? true : false;
    this._wasDestroyedAt = (wasDestroyed) ? this.getUnixTimestamp() : this.wasDestroyedAt;
  }

  /**
   * Gets the wasDestroyed property.
   *
   * @return  {boolean}
   */
  get wasDestroyed() {
    return this._wasDestroyed;
  }

  /**
   * Gets the wasDestroyedAt property.
   *
   * @return {number}
   */
  get wasDestroyedAt() {
    return this._wasDestroyedAt;
  }

  /**
   * Extends Model and returns the constructor for the new class.
   * Convenience method for ES5.
   *
   * @deprecated
   * @param {object} props - custom props for the new class
   * @param {function|undefined} setup - an optional function to run within the new class' constructor
   * @return {function} Extension - the extended class
   */
  static extend(props, setup) {
    const Extension = class extends Model {
      constructor(data) {
        super(data);

        if (typeof setup === 'function') {
          setup(this);
        }
      }
    };

    if (typeof props === 'object') {
      for (let prop in props) {
        if (props.hasOwnProperty(prop)) {
          Extension.prototype[prop] = props[prop];
        }
      }
    }

    return Extension;
  }

  /**
   * Modifies the Model class with the passed properties.
   * This will enable all custom models to inherit the properties passed to this method.
   *
   * @param {object} props - the props to add to the Trux.Model class
   * @return void
   */
  static modify(props) {
    if (typeof props !== 'object') return;

    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        Model.prototype[prop] = props[prop];
      }
    }
  }
}
