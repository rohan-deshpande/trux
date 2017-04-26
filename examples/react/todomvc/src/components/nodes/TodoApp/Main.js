import React, { Component, PropTypes } from 'react';

export default class Main extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    areComplete: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      checked: props.areComplete,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      checked: props.areComplete,
    });
  }

  handleToggle = (e) => {
    const checked = e.target.checked;

    this.setState({ checked: checked }, () => this.props.toggle(checked));
  }

  render() {
    return (!this.props.count) ? null : (
      <section className="main">
        <input
          onChange={this.handleToggle}
          className="toggle-all"
          id="toggle-all"
          name="toggle-all"
          type="checkbox"
          checked={this.state.checked}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {this.props.children}
      </section>
    );
  }
}
