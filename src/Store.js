import EventEmitter from 'EventEmitter';

export default class Store {
  constructor() {
    /**
     * Private reference to this instance
     *
     * @prop {object} store - private reference to this instance
     * @private
     */
    const store = this;

    /**
     * Reference for bound React components
     *
     * @prop {object} components - reference for bound React components
     */
    this.components = {};

    /**
     * The base Event Emitter
     *
     * @prop {object} emitter - the model's Event Emitter
     */
    this.emitter = new EventEmitter();
    /**
     * Request options which align with the qwest options argument for requests.
     *
     * @see https://github.com/pyrsmk/qwest#basics
     * @prop {object} requestOptions - options to be set for the request
     */
    this.requestOptions = {};

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


    function broadcast() {
      if (!Object.keys(store.components).length) {
        return;
      }

      for (var prop in store.components) {
        if (store.components.hasOwnProperty(prop)) {
          store.components[prop].appDataDidChange();
        }
      }
    }
    
    this.emitter.addListener('change', broadcast);
  }
}
