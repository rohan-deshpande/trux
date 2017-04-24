import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.truxid = 'FOOTER';
    this.props.todos.connect(this);
  }

  componentWillUnmount() {
    this.props.todos.disconnect(this);
  }

  storeDidUpdate() {
    this.forceUpdate();
  }

  render() {
    const todos = this.props.todos;
    const items = (this.props.todos.count !== 1) ? 'items' : 'item';

    if (this.props.todos.isEmpty) {
      return null;
    }

    return (
      <footer className="footer">
        <span className="todo-count"><strong>{todos.count}</strong> {items} left</span>
      </footer>
    );
  }
}
