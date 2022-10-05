import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children, elementId }) => {
  const rootElement = useMemo(
    () => document.getElementById(elementId),
    [elementId],
  );

  return createPortal(children, rootElement);
};

Portal.propTypes = {
  children: PropTypes.element.isRequired,
  elementId: PropTypes.string.isRequired,
};

export default Portal;
