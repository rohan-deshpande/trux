import { Model } from 'trux';

export default class Todo extends Model {

  set complete(complete) {
    this.data.complete = complete;
  }

  get complete() {
    return this.data.complete;
  }
}
