import React, { Component } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onBackgroundClick = this.onBackgroundClick.bind(this);
  }

  componentDidMount() {
    window.document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.document.body.style.overflow = 'visible';
  }

  onBackgroundClick(ev) {
    const isBackground = (ev.target.classList.contains('modal-background'));

    if (isBackground) {
      this.props.onBackgroundClick();
    }
  }

  render() {
    return (
      <div className="modal-background" onClick={this.onBackgroundClick}>
        <div className="page-popup">
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  onBackgroundClick: PropTypes.func,
};
