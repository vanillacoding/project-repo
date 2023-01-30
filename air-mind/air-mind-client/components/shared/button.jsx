import styled from 'styled-components';

export const Button = styled.button`
  border: 1px solid white;
  background-color: white;
  color: royalBlue;
  cursor: pointer;
  font: inherit;
`;

export const HeaderButton = styled(Button)`
  width: 8rem;
  height: 3rem;
  margin: 0;
  border: none;
  background-color: #2c2c2c;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
  color: #eff0f5;
  &:hover {
    transition: all 0.3s ease-out;
    background-color: #2c2c2c;
    transition: 250ms;
  }
`;

export const NavBarButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  margin: 0px;
  font-size: 20px;
  color: #2c2c2c;
  &:hover {
    transition: all 0.3s ease-out;
    transition: 250ms;
  }
`;
