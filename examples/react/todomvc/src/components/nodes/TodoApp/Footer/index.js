import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Clear';

/**
 * Footer node - renders the footer component with route links for filters.
 * Will not render if there are no todos.
 *
 * @param {object} props
 * @param {integer} props.count - the total number of todos
 * @param {integer} props.countComplete - the number of completed todos
 * @param {integer} props.countActive - the number of active todos
 * @param {function} props.clearComplete - function to clear completed todos
 * @return {object|null}
 */
export default function Footer({
  count = 0,
  countComplete = 0,
  countActive = 0,
  clearComplete,
}) {
  const items = (countComplete === 1) ? 'item' : 'items';

  return (!count) ? null : (
    <footer className="footer">
      <span className="todo-count"><strong>{countActive}</strong> {items} left</span>
      <ul className="filters">
        <li>
          <NavLink exact to="/" activeClassName="selected">All</NavLink>
        </li>
        <li>
          <NavLink to="/active" activeClassName="selected">Active</NavLink>
        </li>
        <li>
          <NavLink to="/completed" activeClassName="selected">Completed</NavLink>
        </li>
      </ul>
      <Button
        countComplete={countComplete}
        clearComplete={clearComplete}
      />
    </footer>
  );
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  countComplete: PropTypes.number.isRequired,
  countActive: PropTypes.number.isRequired,
  clearComplete: PropTypes.func.isRequired,
};
