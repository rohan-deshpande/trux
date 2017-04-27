import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';

/**
 * Main node - renders the main section of the app.
 *
 * @class
 * @extends Component
 */
export default class Main extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    areComplete: PropTypes.bool.isRequired,
    todos: PropTypes.array.isRequired,
    toggle: PropTypes.func.isRequired,
  }

  /**
   * Constructs the component and sets its initial state.
   * The 'mark all complete' checkbox will be checked if all todos are complete.
   *
   * @param {object} props
   * @param {boolean} props.areComplete - bool to determine if all todos are complete
   */
  constructor(props) {
    super(props);

    this.state = {
      checked: props.areComplete,
    };
  }

  /**
   * Resets the state when new props are received.
   *
   * @augments this.state
   * @param {object} props
   * @return void
   */
  componentWillReceiveProps(props) {
    this.setState({
      checked: props.areComplete,
    });
  }

  /**
   * Handles toggling all todos' complete status.
   *
   * @augments this.state
   * @param {object} e - change event
   * @return void
   */
  handleToggle = (e) => {
    const checked = e.target.checked;

    this.setState({ checked: checked }, () => this.props.toggle(checked));
  }

  /**
   * Renders the component there are todos.
   *
   * @return {null|object}
   */
  render() {
    return (!this.props.count) ? null : (
      <section className="main">
        <input
          onChange={this.handleToggle}
          className="toggle-all"
          id="toggle-all"
          name="toggle-all"
          type="checkbox"
          checked={this.state.checked}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <List todos={this.props.todos} />
      </section>
    );
  }
}
