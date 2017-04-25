import React, { PropTypes } from 'react';
import Item from './Item';

export default function List({ todos, filter }) {
  return (
    <ul className="todo-list">
      {
        todos.filter(filter).map((todo) => {
          return <Item todo={todo} todos={todos} key={todo.id} />;
        })
      }
    </ul>
  );
}

List.propTypes = {
  todos: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
};
