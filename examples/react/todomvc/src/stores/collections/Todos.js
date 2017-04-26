import { Collection } from 'trux';
import { Todo } from '../models';
import { uuid } from '../../utils';
import { STORAGE_KEY } from './';

export default class Todos extends Collection {
  constructor() {
    super(Todo);

    // ensure that whenever a change event is fired, the collection is stored in localStorage.
    this.emitter.addListener('change', () => this.store());
  }

  /**
   * Stores the collection's models' data in local storage.
   *
   * @return void
   */
  store() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.models.map(todo => todo.data),
    ));
  }

  /**
   * Adds a model to the collection and persists the collection.
   *
   * @param {string} title - the title of the todo
   * @return {object} Todos
   */
  add(title) {
    this.prepend(new Todo({
      id: uuid(),
      title: title,
      complete: false,
    }));

    return this.persist();
  }

  /**
   * Removes a model by its id from the collection and persists the collection.
   *
   * @param {number} id - the id of the model to remove
   * @return {object} Todos
   */
  remove(id) {
    this.models = this.models.filter(todo => todo.id !== id);

    return this.persist();
  }

  /**
   * Clears completed todos from the collection and persists the collection.
   *
   * @return {object} Todos
   */
  clear() {
    this.models = this.models.filter(todo => !todo.complete);

    return this.persist();
  }

  /**
   * Toggles the completion of todos.
   *
   * @param {boolean} [complete]
   */
  toggle(complete = true) {
    this.models = this.models.map((todo) => {
      todo.complete = complete;
      return todo;
    });

    return this.persist();
  }

  /**
   * Filters the collection's models based on the filter passed and returns the filtered models.
   *
   * @param {string} filter - the filter
   * @return {array}
   */
  filter(filter) {
    switch (filter) {
      case '/':
        return this.models;
      case '/active':
        return this.models.filter(todo => !todo.complete);
      case '/completed':
        return this.models.filter(todo => todo.complete);
      default:
        return this.models;
    }
  }

  /**
   * Gets the current models count.
   *
   * @return {integer}
   */
  get count() {
    return this.models.length;
  }

  /**
   * Gets the current completed todos count.
   *
   * @return {integer}
   */
  get countComplete() {
    return this.models.filter(todo => todo.complete).length;
  }

  /**
   * Gets the incomplete todos count.
   *
   * @return {integer}
   */
  get countActive() {
    return this.count - this.countComplete;
  }

  /**
   * Boolean to determine if all todos are complete or not.
   *
   * @return {boolean}
   */
  get areComplete() {
    return this.count === this.countComplete;
  }

  /**
   * Returns a boolean to define if the collection is empty or not.
   *
   * @return {boolean}
   */
  get isEmpty() {
    return this.models.length === 0;
  }
}
