import React, { Component, PropTypes } from 'react';
// import { ESCAPE, ENTER } from '../../../utils';

export default class Edit extends Component {

  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
  }

  render() {
    return (
      <input onBlur={this.props.onBlur} className="edit" defaultValue={this.props.todo.title} />
    );
  }
}
