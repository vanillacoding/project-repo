import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { pounding } from '../../../styles/share/animation';

const SIZE_PRESET = {
  small: css`
    min-width: 70px;
    height: 50px;
    font-size: 14px;
  `,
  medium: css`
    min-width: 130px;
    height: 55px;
    font-size: 22px;
  `,
  large: css`
    min-width: 150px;
    height: 50px;
    font-size: 22px;
    line-height: 16px;
    border: ${({ theme }) => theme.buttonBorder};
  `,
};

function Button({
  children,
  onClick,
  text,
  type,
  disabled,
  size,
  backgroundColor,
}) {
  const sizePreset = SIZE_PRESET[size];

  return (
    <StyledButton
      className="styled-button"
      type={type}
      disabled={disabled}
      sizePreset={sizePreset}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {text}
      {children}
    </StyledButton>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  backgroundColor: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  type: 'button',
  disabled: false,
  size: 'small',
  backgroundColor: 'lightPurple',
};

const StyledButton = styled.button`
  margin: 0;
  padding: 10px 15px;
  outline: none;
  cursor: pointer;
  text-align: center;
  border-radius: 18px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ theme }) => theme.white};
  transition: all 100ms ease-out;
  animation: ${pounding} 1.2s infinite;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor && theme[backgroundColor]};
  ${({ sizePreset }) => sizePreset}

  &:active,
  &:hover {
    box-shadow: inset ${({ theme }) => theme.boxShadow};
    transform: scaleX(0.97);
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
