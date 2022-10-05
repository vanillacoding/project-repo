import React from "react";
import styled from "styled-components";

export default function UserList({ users }) {
  return (
    <Wrapper>
      {users.map((user) => {
        const { id, username, isConnected } = user;
        return (
          <ListItem key={id} active={isConnected}>
            <strong>{username}</strong>
          </ListItem>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.ul`
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 30px;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
  ${(props) => !props.active && "opacity: 0.5;"}

  &:before {
    box-sizing: border-box;
    content: "";
    display: inline-block;
    margin-right: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    ${(props) =>
      props.active ? "background-color: #2bac76;" : "border: 2px solid #eee;"}
  }
`;
