import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Modal({ children, closeModal }) {
  return (
    <Wrapper>
      <Dimmed onClick={closeModal} />
      <StyledModal>{children}</StyledModal>
    </Wrapper>
  );
}

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Dimmed = styled.div`
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.baseTheme.colors.lightBlack};
`;

const StyledModal = styled.div`
  z-index: 12;
  position: fixed;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  box-shadow: ${({ theme }) => theme.baseTheme.colors.black};
`;
