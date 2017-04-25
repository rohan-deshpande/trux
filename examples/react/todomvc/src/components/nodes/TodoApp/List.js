import React, { PropTypes } from 'react';
import Item from './Item';

export default function List({ todos, onDestroy }) {
  return (
    <ul className="todo-list">
      {
        todos.map((todo) => {
          return (
            <Item
              todo={todo}
              onDestroy={onDestroy}
              key={todo.id}
            />
          );
        })
      }
    </ul>
  );
}

List.propTypes = {
  todos: PropTypes.array.isRequired,
  onDestroy: PropTypes.func.isRequired,
};
