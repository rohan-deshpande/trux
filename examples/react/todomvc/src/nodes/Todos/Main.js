import React, { PropTypes } from 'react';

export default function Main({ count = 0, children }) {
  return (!count) ? null : (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      {children}
    </section>
  );
}

Main.propTypes = {
  count: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
};
