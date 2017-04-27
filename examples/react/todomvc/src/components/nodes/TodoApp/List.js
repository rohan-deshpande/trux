import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

/**
 * List node - renders a list of todo models.
 *
 * @function
 * @param {object} props
 * @param {array} props.todos - an array of todo models to render
 * @return {function}
 */
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
