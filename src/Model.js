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
     * @return void
     */
    this.fill = (data) => {
      this.data = data;
      backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));
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
   * @return void
   */
  persist() {
    if (this.collection) {
      this.collection.emitChangeEvent();
    }

    this.emitChangeEvent();
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
      this.fill(response.json);

      return Promise.resolve(response);
    }).catch((error) => {
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
      this.fill(response.json);

      return Promise.resolve(response);
    }).catch((error) => {
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
      this.purge();
      this.persist();

      return Promise.resolve(response);
    }).catch((error) => {
      this.restore();
      this.persist();

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
      this.fill(response.json);
      this.persist();

      return Promise.resolve(response);
    }).catch((error) => {
      this.restore();
      this.persist();

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
