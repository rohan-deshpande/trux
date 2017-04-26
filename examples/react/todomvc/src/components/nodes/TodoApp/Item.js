import React, { Component, PropTypes } from 'react';
import Edit from './Edit';

export default class Item extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  handleComplete = (e) => {
    this.props.todo.complete = e.target.checked;
    this.props.todo.persist();
  }

  handleDestroy = (e) => {
    e.preventDefault();
    this.props.todo.destroy();
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ editing: true });
  }

  handleEditBlur = () => {
    this.setState({ editing: false });
  }

  get className() {
    const classes = [];

    if (this.state.editing) {
      classes.push('editing');
    }

    if (this.props.todo.complete) {
      classes.push('completed');
    }

    return classes.join(' ');
  }

  render() {
    const todo = this.props.todo;

    return (
      <li className={this.className}>
        <div className="view">
          <input
            name={todo.id}
            className="toggle"
            type="checkbox"
            defaultChecked={todo.complete}
            onChange={this.handleComplete}
          />
          <label htmlFor={todo.id} onDoubleClick={this.handleEdit}>
            {todo.title}
          </label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        <Edit
          onBlur={this.handleEditBlur}
          show={this.state.editing}
          todo={todo}
        />
      </li>
    );
  }
}
