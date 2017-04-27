import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TodoApp } from './connectors';
import Info from './Info';

export default function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/" component={TodoApp} />
          <Route path="/active" component={TodoApp} />
          <Route path="/completed" component={TodoApp} />
        </Switch>
      </Router>
      <Info />
    </main>
  );
}
