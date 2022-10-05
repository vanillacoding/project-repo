import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export default function Modal({ children, onClose }) {
  return (
    <Wrapper>
      <Dimmed data-testid="dimmed" onClick={onClose} />
      <StyledModal>{children}</StyledModal>
    </Wrapper>
  );
}

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Dimmed = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.darkNavy}85;
`;

const StyledModal = styled.div`
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 450px;
  text-align: center;
  transform: translate(-50%, -50%);
  box-shadow: ${({ theme }) => theme.whiteShadow};
`;
