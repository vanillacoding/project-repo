import PropTypes from 'prop-types';
import styled from 'styled-components';

import { flexCenterColumn } from '../../styles/share/common';

function Modal({ children, onClose, dimmed, background, height }) {
  return (
    <Wrapper>
      <Dimmed data-testid="dimmed" dimmed={dimmed} onClick={onClose} />
      <StyledModal
        className="modal"
        tabIndex="-1"
        background={background}
        height={height}
      >
        {children}
        <CloseButton className="close" onClick={onClose}>
          x
        </CloseButton>
      </StyledModal>
    </Wrapper>
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  dimmed: PropTypes.bool,
  background: PropTypes.string,
  height: PropTypes.string,
};

Modal.defaultProps = {
  dimmed: true,
  background: 'lightPurple',
  height: '300px',
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 375px;
  height: 713px;
  margin: auto;
  transform: translate(-50%, -50%);
`;

const Dimmed = styled.div`
  ${flexCenterColumn}
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme, dimmed }) =>
    dimmed ? `${theme.white}99` : 'transparent'};
`;

const StyledModal = styled.div`
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: ${({ height }) => height && height};
  text-align: center;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  background-color: ${({ background, theme }) =>
    background && theme[background]};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  text-shadow: 0px 6px 2px ${({ theme }) => theme.deepGray};
  background-color: transparent;
  color: ${({ theme }) => theme.white};

  &:active,
  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.deepGray};
  }
`;
