import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Edit from './Edit';

/**
 * Item node - renders individual todo models.
 *
 * @class
 * @extends Component
 */
export default class Item extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
  }

  /**
   * Constructs the component and sets its initial state.
   * 'editing' defaults to false.
   *
   * @param {object} props
   * @return void
   */
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  /**
   * Handles the completing of a todo
   * Sets the todo's complete status and persists it.
   *
   * @param {object} e - change event
   * @return void
   */
  handleComplete = (e) => {
    this.props.todo.complete = e.target.checked;
    this.props.todo.persist();
  }

  /**
   * Handles the destroying of a todo.
   *
   * @param {object} e - click event
   * @return void
   */
  handleDestroy = (e) => {
    e.preventDefault();
    this.props.todo.destroy();
  }

  /**
   * Enables editing mode.
   *
   * @augments this.state
   * @param {object} e - double click event
   * @return void
   */
  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ editing: true });
  }

  /**
   * Disables editing mode.
   *
   * @augments this.state
   * @param {object} e - blur event
   */
  handleEditBlur = () => {
    this.setState({ editing: false });
  }

  /**
   * Derives the correct className for the item.
   *
   * @return {string}
   */
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

  /**
   * Renders the component.
   *
   * @return {object}
   */
  render() {
    const todo = this.props.todo;

    return (
      <li className={this.className}>
        <div className="view">
          <input
            name={todo.id}
            className="toggle"
            type="checkbox"
            checked={todo.complete}
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
