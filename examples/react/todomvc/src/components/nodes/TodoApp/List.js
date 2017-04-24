import React, { PropTypes } from 'react';
import Item from './Item';

export default function List({ todos }) {
  return (
    <ul className="todo-list">
      {
        todos.models.map((todo) => {
          return <Item todo={todo} todos={todos} key={todo.id} />;
        })
      }
    </ul>
  );
}

List.propTypes = {
  todos: PropTypes.object.isRequired,
};
