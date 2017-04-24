import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
  }

  render() {
    return (
      <ul className="todo-list">
        {
          this.props.todos.models.map((todo) => {
            return <TodoItem todo={todo} todos={this.props.todos} key={todo.id} />;
          })
        }
      </ul>
    );
  }
}
