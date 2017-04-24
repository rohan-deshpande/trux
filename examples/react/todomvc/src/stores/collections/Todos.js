import { Collection } from 'trux';
import { Todo } from '../models';
import { uuid } from '../../utils';

export default class Todos extends Collection {
  constructor() {
    super(Todo);
  }

  add(title) {
    this.prepend(new Todo({
      id: uuid(),
      title: title,
      complete: false,
    }));

    return this;
  }

  remove(id) {
    this.models = this.models.filter(todo => todo.id !== id);
    this.persist();
  }

  get count() {
    return this.models.length;
  }

  get completedCount() {
    const total = this.count;
    const completed = this.models.filter(todo => todo.complete).length;

    return total - completed;
  }

  get isEmpty() {
    return this.models.length === 0;
  }
}
