import { Collection } from 'trux';
import { Todo } from '../models';

export default class Todos extends Collection {
  constructor() {
    super(Todo);
  }
}
