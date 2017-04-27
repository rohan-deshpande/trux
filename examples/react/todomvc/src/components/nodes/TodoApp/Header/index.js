import React from 'react';
import PropTypes from 'prop-types';
import New from './New';

export default function Header({ addTodo }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <New addTodo={addTodo} />
    </header>
  );
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
