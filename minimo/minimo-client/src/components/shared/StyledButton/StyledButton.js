import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 51px;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #111111;
  font-family: sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 300;
  border: transparent 1px solid;
  box-shadow: 0px 3px 6px -6px rgb(0 0 0 / 32%);
  opacity: 1;
  line-height: 1;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: pointer;
  text-transform: none;
  text-align: center;
  position: relative;
  border-radius: 0;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OkButton = styled(StyledButton)`
  display: inline-block;
  width: auto;
  height: 50px;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 135px;
  background: #f7f7f7;

  &:hover {
    background: #e0dfdf;
  }
`;
