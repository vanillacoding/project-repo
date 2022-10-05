import styled from "styled-components";

import ToggleButton from "@/components/element/ToggleButton";

const Container = styled.li`
  width: 100%;
  margin: 0 2em;
`;

const Name = styled.span`
  display: inline-block;
  width: 10vw;
  font-size: 0.4em;
  font-weight: 400;
  color: ${(props) => props.theme.gray.color};
`;

const InitButton = styled(ToggleButton)`
  color: ${(props) => props.theme.gray.color};
  border: 1px solid ${(props) => props.theme.gray.color};

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.theme.white.color};
    background-color: ${(props) => props.theme.gray.color};
  }
`;

export {
  Container,
  Name,
  ToggleButton,
  InitButton,
};
