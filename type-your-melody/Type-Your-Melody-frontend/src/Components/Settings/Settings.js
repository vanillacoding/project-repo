import React, { Component } from 'react';
import minus from '../../img/minus.png'
import plus from '../../img/plus.png'

import './Settings.css';

class Settings extends Component {
  increment () {
    if (this.props.value < this.props.max) {
      this.props.increment();
    }
  }

  decrement () {
    if (this.props.value > this.props.min) {
      this.props.decrement();
    }
  }

  render() {
    return (
      <div className="Settings">
        <img alt="button" className="buttons-img" src={minus} onClick={this.decrement.bind(this)} />
        <div className="value">{this.props.value}</div>
        <img alt="button" className="buttons-img" src={plus} onClick={this.increment.bind(this)} />
      </div>
    );
  }
}

export default Settings;
