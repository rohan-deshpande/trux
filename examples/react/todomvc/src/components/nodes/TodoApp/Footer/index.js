import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './ClearCompleted';

export default function Footer({
  count = 0,
  completedCount = 0,
  remainingCount = 0,
  clearCompleted = () => {},
}) {
  const items = (completedCount === 1) ? 'item' : 'items';

  return (!count) ? null : (
    <footer className="footer">
      <span className="todo-count"><strong>{remainingCount}</strong> {items} left</span>
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
        completedCount={completedCount}
        clearCompleted={clearCompleted}
      />
    </footer>
  );
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  remainingCount: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
