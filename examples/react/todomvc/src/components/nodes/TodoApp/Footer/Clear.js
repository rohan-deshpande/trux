import React from 'react';
import PropTypes from 'prop-types';

/**
 * Clear node - renders the button to clear all completed todos.
 * Will not render if there are no completed todos.
 *
 * @function
 * @param {object} props
 * @param {integer} props.countComplete - the number of completed todos
 * @param {function} props.clearComplete - the function to clear all todos
 * @return {object|null}
 */
export default function Clear({
  countComplete = 0,
  clearComplete,
}) {
  /**
   * Handles the click event for the button.
   *
   * @private
   * @param {object} e - click event
   * @return void
   */
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
