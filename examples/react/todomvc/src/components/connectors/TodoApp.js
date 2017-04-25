import React, { Component, PropTypes } from 'react';
import { Main, Footer, New, List } from '../nodes/';
import stores from '../../stores';

const todos = stores.todos;

export default class TodoApp extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.truxid = 'TODO_APP';
    todos.connect(this);
  }

  componentWillUnmount() {
    todos.disconnect(this);
  }

  storeDidUpdate() {
    this.forceUpdate();
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <New addTodo={title => todos.add(title)} />
        </header>
        <Main count={todos.count}>
          <List todos={todos} filter={this.props.match.path} />
        </Main>
        <Footer
          count={todos.count}
          completedCount={todos.completedCount}
          remainingCount={todos.remainingCount}
          clearCompleted={() => todos.clearCompleted()}
        />
      </section>
    );
  }
}
