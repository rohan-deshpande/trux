import React, { Component, PropTypes } from 'react';
import { Main, Footer, New, List } from '../nodes/';
import stores from '../../stores';

/**
 * @const {object} todos - the store for this connector.
 */
const todos = stores.todos;

/**
 * TodoApp connector component.
 *
 * @class
 * @extends Component
 */
export default class TodoApp extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  /**
   * Construct the component and set the initial state.
   *
   * @param {object} props
   * @return void
   */
  constructor(props) {
    super(props);

    this.state = {
      count: todos.count,
      countComplete: todos.countComplete,
      countActive: todos.countActive,
      areComplete: todos.areComplete,
    };
  }

  /**
   * Connect TodoApp to the todos store.
   *
   * @return void
   */
  componentDidMount() {
    this.truxid = 'TODO_APP';
    todos.connect(this);
  }

  /**
   * Disconnect TodoApp from the todos store.
   *
   * @return void
   */
  componentWillUnmount() {
    todos.disconnect(this);
  }

  /**
   * Receive broadcasted changes and update the state.
   *
   * @return void
   */
  storeDidUpdate() {
    this.setState({
      count: todos.count,
      countComplete: todos.countComplete,
      countActive: todos.countActive,
      areComplete: todos.areComplete,
    });
  }

  /**
   * Render the component.
   *
   * @return {object}
   */
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <New addTodo={title => todos.add(title)} />
        </header>
        <Main
          count={this.state.count}
          areComplete={this.state.areComplete}
          toggle={complete => todos.toggle(complete)}
        >
          <List
            todos={todos.filter(this.props.match.path)}
          />
        </Main>
        <Footer
          count={this.state.count}
          countComplete={this.state.countComplete}
          countActive={this.state.countActive}
          clearComplete={() => todos.clear()}
        />
      </section>
    );
  }
}
