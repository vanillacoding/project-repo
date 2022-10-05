import BarLoader from 'react-spinners/BarLoader';
import PropTypes from 'prop-types';

import theme from '../../../../styles/theme';
import { Wrapper } from '../../../../styles/share/spinnerStyle';

function BarSpinner({ color = 'white' }) {
  return (
    <Wrapper>
      <BarLoader
        size="90px"
        width="100px"
        height="6px"
        color={theme[color]}
        radius="10"
      />
    </Wrapper>
  );
}

export default BarSpinner;

BarSpinner.propTypes = {
  color: PropTypes.string,
};

BarSpinner.defaultProps = {
  color: theme.white,
};
