import React, { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  render() {
    const todo = this.props.todo;

    return (
      <li className={(todo.complete) ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>{todo.label}</label>
          <button className="destroy"></button>
        </div>
      </li>
    )
  }
}
