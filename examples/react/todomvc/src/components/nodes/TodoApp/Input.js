import React, { Component, PropTypes } from 'react';
import { ESCAPE, ENTER } from '../../../utils';

export default class Input extends Component {

  static propTypes = {
    todo: PropTypes.object,
  }

  static defaultProps = {
    todo: {},
  }

  constructor(props) {
    super(props);

    const todo = this.props.todo;

    this.state = {
      title: todo.title ? todo.title : '',
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  handleKeyDown = (e) => {
    const title = this.state.title.trim();

    if (e.which === ESCAPE) {
      this.setState({ title: '' });
    } else if (e.which === ENTER) {
      this.setState({ title: '' }, () => {
        this.props.addTodo(title);
      });
    }
  }

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.state.title}
        autoFocus
      />
    );
  }
}
