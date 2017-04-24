import React, { Component, PropTypes } from 'react';
import { ESCAPE, ENTER } from '../utils';

export default class TodoAdder extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  handleKeyDown = (e) => {
    if (e.which === ESCAPE) {
      this.setState({ title: '' });
    } else if (e.which === ENTER) {
      const title = this.state.title;

      this.setState({ title: '' }, () => {
        this.props.todos.add(title).persist();
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
