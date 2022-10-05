import styled from 'styled-components';

export const StyledButton = styled.button`
  text-decoration: none;
  background-color: ${props => props.theme.backgroundColor};
  padding: ${props => props.theme.padding};
  border: ${props => props.theme.border};
  display: inline-block;
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.fontSize};
  font-weight: ${props => props.theme.fontWeight};
  color: ${props => props.theme.color};
  width: ${props => props.theme.width};
  height: ${props => props.theme.height};
  margin: ${props => props.theme.margin};
  position: ${props => props.theme.position};
  top: ${props => props.theme.top};
  left: ${props => props.theme.left};
  transform: ${props => props.theme.transform};

  &:hover {
    cursor: pointer;
  }
`;

export const logoutButtonTheme = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: 'xx-large',
  marginLeft: '1em',
};

export const permissionHandleButtonTheme = {
  width: '5em',
  height: '2em',
  backgroundColor: '#f08080',
  border: 'none',
  borderRadius: '1em',
  margin: '0 3px',
};

export const homeButtonTheme = {
  backgroundColor: 'white',
  fontSize: '26px',
  fontWeight: 900,
  border: 'none',
};

export const deleteButtonTheme = {
  color: 'red',
  backgroundColor: 'white',
  fontSize: '12px',
  border: 'none',
};

export const coralButtonTheme = {
  backgroundColor: '#f08080',
  fontSize: '16px',
  border: 'none',
  borderRadius: '1em',
};

export const shareButtonTheme = {
  backgroundColor: '#f08080',
  width: '5em',
  height: '2em',
  border: 'none',
  borderRadius: '1em',
};

export const saveButtonTheme = {
  fontSize: '18px',
  fontWeight: 700,
  border: 'none',
  borderRadius: '1em',
};

export const iconButtonTheme = {
  backgroundColor: 'transparent',
  border: 'none',
};

export const createNewBranchTheme = {
  backgroundColor: 'transparent',
  border: '2.5px solid #f08080',
  width: '50%',
  height: '3.2em',
  borderRadius: '1em',
  fontSize: '16px',
  margin: '0 0 0 30%',
  transform: 'translate(-50 %, -50 %)',
};
