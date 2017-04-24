import React, { PropTypes } from 'react';
import TodoListItem from './TodoListItem';

export default function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {
        todos.models.map((todo) => {
          return <TodoListItem todo={todo} todos={todos} key={todo.id} />;
        })
      }
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.object.isRequired,
};
