import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Main, Footer, New, List } from '../nodes/';
import stores from '../../stores';

/**
 * @const {object} store - the store for this connector.
 */
const store = stores.todos;

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
      count: store.count,
      countComplete: store.countComplete,
      countActive: store.countActive,
      areComplete: store.areComplete,
    };
  }

  /**
   * Connect TodoApp to the store.
   *
   * @return void
   */
  componentDidMount() {
    this.truxid = 'TODO_APP';
    store.connect(this);
  }

  /**
   * Disconnect TodoApp from the store.
   *
   * @return void
   */
  componentWillUnmount() {
    store.disconnect(this);
  }

  /**
   * Receive broadcasted changes and update the state.
   *
   * @return void
   */
  storeDidUpdate() {
    this.setState({
      count: store.count,
      countComplete: store.countComplete,
      countActive: store.countActive,
      areComplete: store.areComplete,
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
          <New addTodo={title => store.add(title)} />
        </header>
        <Main
          count={this.state.count}
          areComplete={this.state.areComplete}
          toggle={complete => store.toggle(complete)}
        >
          <List
            todos={store.filter(this.props.match.path)}
          />
        </Main>
        <Footer
          count={this.state.count}
          countComplete={this.state.countComplete}
          countActive={this.state.countActive}
          clearComplete={() => store.clear()}
        />
      </section>
    );
  }
}
