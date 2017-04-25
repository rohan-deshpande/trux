import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ count = 0, completedCount = 0 }) {
  const items = (completedCount === 1) ? 'item' : 'items';

  return (!count) ? null : (
    <footer className="footer">
      <span className="todo-count"><strong>{completedCount}</strong> {items} left</span>
      <ul className="filters">
        <li>
          <Link to="/">All</Link>
        </li>
        <li>
          <Link to="/active">Active</Link>
        </li>
        <li>
          <Link to="/completed">Completed</Link>
        </li>
      </ul>
    </footer>
  );
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
};
