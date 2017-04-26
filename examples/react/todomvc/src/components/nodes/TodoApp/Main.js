import React, { Component, PropTypes } from 'react';

export default class Main extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      complete: false,
    };
  }

  handleToggle = (e) => {
    this.props.toggle(e.target.checked);
  }

  render() {
    return (!this.props.count) ? null : (
      <section className="main">
        <input
          onClick={this.handleToggle}
          className="toggle-all"
          id="toggle-all"
          name="toggle-all"
          type="checkbox"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {this.props.children}
      </section>
    );
  }
}
