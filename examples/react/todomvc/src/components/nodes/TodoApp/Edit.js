import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ESCAPE, ENTER } from '../../../utils';

/**
 * Edit node - renders the editing input for todo titles.
 *
 * @class
 * @extends Component
 */
export default class Edit extends Component {

  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    todo: PropTypes.object.isRequired,
  };

  /**
   * Construct the component and set its initial state.
   *
   * @param {object} props
   * @return void
   */
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todo.title,
    };
  }

  /**
   * Handles the input blur event.
   *
   * @return void
   */
  handleBlur = () => {
    this.save();
    this.props.onBlur();
  }

  /**
   * Handles the input change event.
   *
   * @augments this.state
   * @param {object} e - change event
   * @return void
   */
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  /**
   * Handles key down when the input has focus. Escape will cancel and revert,
   * Enter will save.
   *
   * @augments this.state
   * @param {object} e - keyDown event
   * @return void
   */
  handleKeyDown = (e) => {
    if (e.which === ESCAPE) {
      this.setState({ value: this.props.todo.title }, this.props.onBlur);
    } else if (e.which === ENTER) {
      this.handleBlur();
    }
  }

  /**
   * Sets the todo's title and persists this change.
   *
   * @return void
   */
  save() {
    this.props.todo.title = this.state.value;
    this.props.todo.persist();
  }

  /**
   * Renders the component, will render null if this.props.show is false.
   *
   * @return {null|object}
   */
  render() {
    return (!this.props.show) ? null : (
      <input
        autoFocus
        className="edit"
        value={this.state.value}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
