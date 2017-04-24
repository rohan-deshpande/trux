import React, { Component, PropTypes } from 'react';
import { Main, Footer, TodoAdder, TodoList } from '../nodes';

export default class TodoApp extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.truxid = 'TODO_APP';
    this.props.store.connect(this);
  }

  componentWillUnmount() {
    this.props.store.disconnect(this);
  }

  storeDidUpdate() {
    this.forceUpdate();
  }

  render() {
    const todos = this.props.store;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoAdder todos={todos} />
        </header>
        <Main count={todos.count}>
          <TodoList todos={todos} />
        </Main>
        <Footer count={todos.count} completedCount={todos.completedCount} />
      </section>
    );
  }
}
