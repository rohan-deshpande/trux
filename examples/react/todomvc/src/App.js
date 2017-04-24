import 'todomvc-app-css/index.css';
import React, { Component } from 'react';
import stores from './stores';
import { Main } from './connectors';

class App extends Component {
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <Main todos={stores.todos} />
      </section>
    );
  }
}

export default App;
