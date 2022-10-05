import styled from 'styled-components';

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #ffffff43;
  cursor: pointer;
  background-color: #ffffff5a;
  color: white;
  text-align: center;
  text-decoration: none;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    transform: translateY(4px);
  }
`;

export default Button;
