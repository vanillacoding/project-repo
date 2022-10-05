import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: 'rgba(0, 0, 0, 0.7)';
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: ${props => props.theme.width};
  height: ${props => props.theme.height};
  background-color: ${props => props.theme.backgroundColor};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.6);
  position: absolute;
  top: ${props => props.theme.top};
  left: ${props => props.theme.left};
  padding-bottom: 1em;
  border-radius: 1em;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1000;
`;

ModalContainer.defaultProps = {
  theme: {
    width: '20em',
    height: '10em',
    backgroundColor: 'white',
    top: '75px',
    left: '83.3%'
  }
};

export const profileIconTheme = {
  width: '20em',
  height: '10em',
  backgroundColor: 'white',
  top: '75px',
  left: '83.3%'
};

export const sharingModalTheme = {
  backgroundColor: 'white',
  width: '50em',
  height: '25em',
  top: '14%',
  left: '23%'
};
