import styled from "styled-components";

export default styled.div`
  position: relative;
  padding: ${props => props.padding};
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => props.backgroundColor ? props.backgroundColor : "white"};
  box-sizing: border-box;
  border-radius: 5px;
  overflow-y: scroll;
`;
