import styled from 'styled-components';

export const StyledInputArea = styled.input`
  border: ${props => props.theme.border};

  &:focus {
    outline: none;
  }
`;
