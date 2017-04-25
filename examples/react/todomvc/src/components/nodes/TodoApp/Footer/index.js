import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Clear';

export default function Footer({
  count = 0,
  countComplete = 0,
  countActive = 0,
  clearComplete = () => {},
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
