import React, { Component, PropTypes } from 'react';
import { ESCAPE, ENTER } from '../../../utils';

export default class New extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
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
    const title = this.state.title;

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
        autoFocus
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.title}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
