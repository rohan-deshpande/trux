import React, { PropTypes } from 'react';
import Item from './Item';

export default function List({ todos }) {
  return (
    <ul className="todo-list">
      {
        todos.map((todo) => {
          return (
            <Item
              todo={todo}
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
};
