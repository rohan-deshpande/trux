import Store from './Store';
import { fetch } from 'whatwg-fetch';

export default class Collection extends Store {

  /**
   * A store for many models.
   *
   * @param {function} model - the constructor for the model which this collection contains
   * @return {object} this - collection
   * @constructor
   */
  constructor(model) {
    super();

    this.model = model;
    this.models = [];

    return this;
  }

  /**
   * Fills the collection with models.
   * Instantiates a Model for each data item contained with in the passed array.
   * Appends these models into this.models.
   *
   * @param {array} models - array of model data objects
   * @return {object} Collection
   */
  fill(models) {
    const length = models.length;

    if (!Array.isArray(models)) {
      throw new TypeError('collections can only be filled with arrays');
    }

    this.purge();

    for (let i = 0; i < length; i++) {
      this.append(new this.model(models[i]));
    }

    return this;
  }

  /**
   * Appends a model to the collection's models.
   *
   * @param {object} model - a model, must be an instance of this.model
   * @return {object} Collection
   */
  append(model) {
    if (!(model instanceof this.model)) {
      throw new Error('collections can only contain one kind of model');
    }

    model.collection = this;
    this.models.push(model);

    return this;
  }

  /**
   * Prepends a model to the collection's models.
   *
   * @param {object} model - a model, must be an instance of this.model
   * @return {object} Collection
   */
  prepend(model) {
    if (!(model instanceof this.model)) {
      throw new Error('collections can only contain one kind of model');
    }

    model.collection = this;
    this.models.unshift(model);

    return this;
  }

  /**
   * Purges the collection of its models.
   *
   * @return void
   */
  purge() {
    this.models = [];
  }

  /**
   * Gets a collection from a remote resource.
   *
   */
  get() {
    return fetch(
      this.GET,
      {
        method: 'GET',
        headers: new Headers(this.requestHeaders)
      }
    ).then((response) => {
      // todo
    });
  }

  /**
   * Extends Collectioj and returns the constructor for the new class.
   * Convenience method for ES5.
   *
   * @deprecated
   * @param {object} props - custom props for the new class
   * @param {function|undefined} setup - an optional function to run within the new class' constructor
   * @return {function} Extension - the extended class
   */
  static extend(props, setup) {
    const Extension = class extends Collection {
      constructor(model) {
        super(model);

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
   * Modifies the Collection class with the passed properties.
   * This will enable all custom collections to inherit the properties passed to this method.
   *
   * @param {object} props - the props to add to the Collection class
   * @return void
   */
  static modify(props) {
    if (typeof props !== 'object') return;

    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        Collection.prototype[prop] = props[prop];
      }
    }
  }
}
