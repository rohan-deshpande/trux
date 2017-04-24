import React, { PropTypes } from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {
        todos.models.map((todo) => {
          return <TodoItem todo={todo} todos={todos} key={todo.id} />;
        })
      }
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.object.isRequired,
};
