import { Todo } from './models';
import { Todos } from './collections';

const todos = new Todos();

todos.add('Task one')
  .add('Task two');

export default {
  todo: new Todo(),
  todos: todos,
};
