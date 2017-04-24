import React, { PropTypes } from 'react';

export default function Footer({ completedCount = 0 }) {
  const items = (completedCount === 1) ? 'item' : 'items';

  return (
    <footer className="footer">
      <span className="todo-count"><strong>{completedCount}</strong> {items} left</span>
    </footer>
  );
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
};
