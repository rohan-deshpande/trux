import React, { Component, PropTypes } from 'react';

export default class Main extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired,
  }

  render() {
    if (!this.props.count) {
      return null;
    }

    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {this.props.children}
      </section>
    );
  }
}
