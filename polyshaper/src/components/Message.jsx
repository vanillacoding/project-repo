import React, { Component } from 'react';
import styles from './style/message.module.scss';

export class Message extends Component {
  render() {

    return (
      <div className={styles.message}>{this.props.message[this.props.message.length-1]}</div>
    );
  }
}

export default Message
