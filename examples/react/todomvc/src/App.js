import 'todomvc-app-css/index.css';
import React, { Component } from 'react';
import stores from './stores';
import { TodoApp } from './connectors';

class App extends Component {

  render() {
    return <TodoApp store={stores.todos} />;
  }
}

export default App;
