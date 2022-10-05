import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Screenshot.scss';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';

class Screenshot extends Component {
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { screenshot } = this.props;

    if (screenshot.isLoading) {
      return <FaSpinner className="screenshot__loader" size={40} />;
    }

    return (
      <div className="screenshot-wrapper">
        <iframe className="screenshot" srcDoc={screenshot.source} />
        <Link to="/">
          <IoMdHome className="btn-home" size="25" />
        </Link>
      </div>
    );
  }
}

export default Screenshot;

Screenshot.propTypes = {
  onUnmount: PropTypes.func,
  screenshot: PropTypes.shape({
    isLoading: PropTypes.bool,
    source: PropTypes.string,
    onUnmount: PropTypes.func,
  }),
};
