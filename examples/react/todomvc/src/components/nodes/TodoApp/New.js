import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ESCAPE, ENTER } from '../../../utils';

/**
 * New node - renders the input for creating new todos.
 *
 * @class
 * @extends Component
 */
export default class New extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  }

  /**
   * Constructs the component and sets its initial state.
   * Titles will always be blank by default.
   *
   * @param {object} props
   * @param {function} props.addTodo - function for adding todos
   * @return void
   */
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  /**
   * Handles the input change event.
   *
   * @augments this.state
   * @param {object} e - change event
   * @return void
   */
  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  /**
   * Handles key down events when the input has focus.
   *
   * @augments this.state
   * @param {object} e - key down event
   * @return void
   */
  handleKeyDown = (e) => {
    const title = this.state.title;

    if (e.which === ESCAPE) {
      this.setState({ title: '' });
    } else if (e.which === ENTER) {
      this.setState({ title: '' }, () => {
        this.props.addTodo(title);
      });
    }
  }

  /**
   * Renders the component.
   *
   * @return {object}
   */
  render() {
    return (
      <input
        autoFocus
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.title}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
