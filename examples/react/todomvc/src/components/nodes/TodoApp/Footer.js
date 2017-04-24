import React, { PropTypes } from 'react';

export default function Footer({ count = 0, completedCount = 0 }) {
  const items = (completedCount === 1) ? 'item' : 'items';

  return (!count) ? null : (
    <footer className="footer">
      <span className="todo-count"><strong>{completedCount}</strong> {items} left</span>
    </footer>
  );
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
};
