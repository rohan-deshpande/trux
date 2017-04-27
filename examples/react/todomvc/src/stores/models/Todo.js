import { Model } from 'trux';

export default class Todo extends Model {

  /**
   * Destroy the Todo by removing it from the collection.
   *
   * @return void
   */
  destroy() {
    this.collection.remove(this.id);
  }

  /**
   * Get the id of the Todo.
   *
   * @return {number}
   */
  get id() {
    return this.data.id;
  }

  /**
   * Set the title of the Todo.
   *
   * @param {string} title - the title of the Todo
   * @return void
   */
  set title(title) {
    this.data.title = title.trim();
  }

  /**
   * Get the title of the Todo.
   *
   * @return {string}
   */
  get title() {
    return this.data.title;
  }

  /**
   * Get the complete status of the Todo.
   *
   * @return {boolean}
   */
  get complete() {
    return this.data.complete;
  }

  /**
   * Sets the complete status of the Todo.
   *
   * @param {boolean} complete
   * @throws TypeError - if the argument passed is not of type boolean
   * @return void
   */
  set complete(complete) {
    if (typeof complete !== 'boolean') {
      throw new TypeError();
    }

    this.data.complete = complete;
  }
}
