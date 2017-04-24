import { Model } from 'trux';

export default class Todo extends Model {

  get id() {
    return this.data.id;
  }

  set title(title) {
    this.data.title = title;
  }

  get title() {
    return this.data.title;
  }

  set complete(complete) {
    if (typeof complete !== 'boolean') {
      throw new TypeError();
    }

    this.data.complete = complete;
  }

  get complete() {
    return this.data.complete;
  }

  destroy() {
    
  }
}
