import React from 'react';
import stores from './stores';
import { Todos } from './connectors';

export default function App() {
  return <Todos store={stores.todos} />;
}
