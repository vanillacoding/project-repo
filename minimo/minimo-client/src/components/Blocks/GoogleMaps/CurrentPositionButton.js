import PropTypes from 'prop-types';
import React from 'react';
import * as ICON from 'react-feather';
import styled from 'styled-components';
import { StyledButton } from '../../shared/StyledButton';

export default function CurrentPositionButton({ onClick }) {
  return (
    <Button
      type='button'
      onClick={onClick}
    >
      <ICON.Navigation color='white' />
    </Button>
  );
}

CurrentPositionButton.propTypes = {
  onClick: PropTypes.func,
};

const Button = styled(StyledButton)`
  width: 30px;
  height: 30px;
  padding: 0.25rem;
  background: rgba(0,0,0,0.15);

  &:hover {
    background: rgba(0,0,0,0.25);
  }
`;
