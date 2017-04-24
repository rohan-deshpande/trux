import 'todomvc-app-css/index.css';
import React, { Component } from 'react';
import stores from './stores';
import { Main, Footer } from './connectors';
import { TodoAdder } from './nodes';

class App extends Component {

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoAdder todos={stores.todos} />
        </header>
        <Main todos={stores.todos} />
        <Footer todos={stores.todos} />
      </section>
    );
  }
}

export default App;
