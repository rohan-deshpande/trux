import React, { Component, PropTypes } from 'react';
// import { ESCAPE, ENTER } from '../../../utils';

export default class Edit extends Component {

  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    todo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todo.title,
    };
  }

  handleBlur = () => {
    this.save();
    this.props.onBlur();
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  save() {
    this.props.todo.title = this.state.value;
    this.props.todo.persist();
  }

  render() {
    return (!this.props.show) ? null : (
      <input
        autoFocus
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onChange={this.handleChange}
        className="edit"
        value={this.state.value}
      />
    );
  }
}
