import Store from './Store';
import { fetch } from 'whatwg-fetch';

export default class Model extends Store {

  /**
   * A client side interface for a remote data Model.
   *
   * @param {object} data - the data which defines this Model
   * @return {object} this - this Model
   * @example
     //basic usage
     var MyModel = new Trux.Model({message:'hello world'});
   * @example
     //advanced usage
     Trux.models.User = Trux.extend({
          getName: function () {
              return this.data.name;
          }
     }, false);

     var Frodo = new Trux.models.User({name:'Frodo Baggins'});

     console.log(Frodo.getName()); // logs 'Frodo Baggins'
   * @constructor
   */
  constructor(data) {
    super();

    let backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));

    /**
     * The data which defines this model, initially null.
     *
     * @prop {Null|Object} data - the data which defines this Model, initially null
     */
    this.data = data;

    /**
     * The collection this model belongs to, if it does belong to one. Initially false.
     *
     * @prop {Boolean|Object} collection - the collection this model belongs to
     */
    this.collection = false;

    /**
     * Fills the model with data.
     * Also sets the private backup for this model.
     *
     * @param {Object} data - the data that defines this model
     * @return void
     */
    this.fill = (data) => {
      this.data = data;
      backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));
    };

    this.restore = () => {
      this.data = (!backup || Object.keys(backup).length === 0) ? {} : JSON.parse(JSON.stringify(backup));
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
   * Requests the remote data for the Model, then sets the Model data with the response.
   *
   * @return {Object} Promise
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

  create(data) {
    return fetch(
      this.POST,
      {
        method: 'POST',
        body: data,
        headers: new Headers(this.requestHeaders)
      }
    ).then((response) => {
      // todo
    });
  }

  update() {
    return fetch(
      this.PUT,
      {
        method: 'PUT',
        body: data,
        headers: new Headers(this.requestHeaders)
      }
    ).then((response) => {
      // todo
    });
  }

  purge() {
    this.data = null;

    return this;
  }

  extend(props, setup) {
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

  modify(props) {
    if (typeof props === 'object') {
      for (let prop in props) {
        if (props.hasOwnProperty(prop)) {
          Model.prototype[prop] = props[prop];
        }
      }
    }

    return this;
  }
}
