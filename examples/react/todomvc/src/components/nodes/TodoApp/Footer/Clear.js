import React, { PropTypes } from 'react';

export default function Clear({
  countComplete = 0,
  clearComplete,
}) {
  function handleClick(e) {
    e.preventDefault();
    clearComplete();
  }

  return (!countComplete) ? null : (
    <button onClick={handleClick} className="clear-completed">
        Clear completed
    </button>
  );
}

Clear.propTypes = {
  countComplete: PropTypes.number.isRequired,
  clearComplete: PropTypes.func.isRequired,
};
