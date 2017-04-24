import 'todomvc-app-css/index.css';
import React, { Component } from 'react';
import stores from './stores';
import { Main, Footer } from './connectors';

console.log(stores);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newTodoTitle: '',
    };
  }

  setNewTodoTitle = (e) => {
    this.setState({
      newTodoTitle: e.target.value,
    });
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.setNewTodoTitle}
            value={this.state.newTodoTitle}
            autoFocus
          />
        </header>
        <Main todos={stores.todos} />
        <Footer todos={stores.todos} />
      </section>
    );
  }
}

export default App;
