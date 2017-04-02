import Store from './Store';
import { fetch } from 'whatwg-fetch';

export default class Collection extends Store {
  constructor(model) {
    super();

    this.model = model;
    this.models = [];

    return this;
  }

  fetch() {

  }
}
