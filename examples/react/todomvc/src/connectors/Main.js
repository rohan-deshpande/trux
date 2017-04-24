import React, { Component, PropTypes } from 'react';
import { TodoList } from '../nodes';

export default class Main extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.truxid = 'MAIN';
    this.props.todos.connect(this);
  }

  componentWillUnmount() {
    this.props.todos.disconnect(this);
  }

  storeDidUpdate() {
    this.forceUpdate();
  }

  render() {
    if (this.props.todos.isEmpty) {
      return null;
    }

    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList todos={this.props.todos} />
      </section>
    );
  }
}
