import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired
  }

  render() {
    const items = (this.props.completedCount === 1) ? 'item' : 'items';

    if (!this.props.count) {
      return null;
    }

    return (
      <footer className="footer">
        <span className="todo-count"><strong>{this.props.completedCount}</strong> {items} left</span>
      </footer>
    );
  }
}
