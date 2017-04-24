import React from 'react';
import stores from '../stores';
import { TodoApp } from './connectors';

export default function App() {
  return <TodoApp store={stores.todos} />;
}
