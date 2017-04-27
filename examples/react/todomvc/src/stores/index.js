import { Todo } from './models';
import { Todos, STORAGE_KEY } from './collections';

const todos = new Todos();
const stored = localStorage.getItem(STORAGE_KEY);

if (stored) {
  todos.fill(JSON.parse(stored));
} else {
  todos.add('Task one').add('Task two');
}

export default {
  todo: new Todo(),
  todos: todos,
};
