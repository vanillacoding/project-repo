import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const Loading = ({ color }) => (
  <ReactLoading
    type='cubes'
    color={color}
    height='10%'
    width='10%'
  />
);

Loading.defaultProps = {
  color: '#fff'
};

Loading.propTypes = {
  color: PropTypes.string.isRequired
};

export default Loading;
