import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Main, Footer } from '../nodes/TodoApp';
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
    const state = this.state;

    return (
      <section className="todoapp">
        <Header
          addTodo={title => store.add(title)}
        />
        <Main
          count={state.count}
          areComplete={state.areComplete}
          toggle={complete => store.toggle(complete)}
          todos={store.filter(this.props.match.path)}
        />
        <Footer
          count={state.count}
          countComplete={state.countComplete}
          countActive={state.countActive}
          clearComplete={() => store.clear()}
        />
      </section>
    );
  }
}
