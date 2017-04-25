import React, { PropTypes } from 'react';

export default function ClearCompleted({
  completedCount = 0,
  clearCompleted,
}) {
  function handleClick(e) {
    e.preventDefault();
    clearCompleted();
  }

  return (!completedCount) ? null : (
    <button onClick={handleClick} className="clear-completed">
        Clear completed
    </button>
  );
}

ClearCompleted.propTypes = {
  completedCount: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
