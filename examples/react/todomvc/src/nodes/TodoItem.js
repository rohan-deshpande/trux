import React, { Component, PropTypes } from 'react';

export default class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired,
  }

  handleComplete = (e) => {
    this.props.todo.complete = e.target.checked;
    this.props.todo.persist();
  }

  handleDestroy = (e) => {
    e.preventDefault();

    this.props.todos.remove(this.props.todo.id);
  }

  render() {
    const todo = this.props.todo;

    return (
      <li className={(todo.complete) ? 'completed' : ''}>
        <div className="view">
          <input
            name={todo.id}
            className="toggle"
            type="checkbox"
            defaultChecked={todo.complete}
            onChange={this.handleComplete}
          />
          <label htmlFor={todo.id}>
            {todo.title}
          </label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
      </li>
    );
  }
}
