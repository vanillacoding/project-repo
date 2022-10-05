import React from "react";
import FormField from "../../components/FormField/FormField";
import styled from "styled-components";
import MemberPermissionItem from "../../components/MemberPermissionItem/MemberPermissionItem";

export default function Participants({
  email,
  onMailFormSubmit,
  members,
  memberAdminStore,
  onSelectChange,
  onPermissionSubmit,
}) {
  return (
    <>
      <h3>Invite Team mate</h3>
      <Form onSubmit={onMailFormSubmit}>
        <FormField
          type="email"
          placeholder="Type the email of the invitees"
          controller={email}
        />
        <Button>Send</Button>
      </Form>
      <h3>Permissions</h3>
      <form onSubmit={onPermissionSubmit}>
        <Table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Level</td>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              const { id, username } = member;
              return (
                <MemberPermissionItem
                  key={id}
                  id={id}
                  username={username}
                  isAdmin={memberAdminStore[id]}
                  onChange={onSelectChange}
                />
              );
            })}
          </tbody>
        </Table>
        <Button>Save</Button>
      </form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  margin-bottom: 30px;
  & > fieldset {
    flex: 1;
    & input {
      width: 100%;
    }
    margin-right: 15px;
  }
`;
const Table = styled.table`
  width: 100%;
  font-size: 16px;
  margin-bottom: 21px;
  & thead {
    background-color: #956496;
    color: #fff;
  }
  & td {
    padding: 10px 15px;
    border: 1px solid #ebebeb;
    &:first-child {
      width: 70%;
    }

    & select {
      width: 100%;
    }
  }
`;
const Button = styled.button`
  border: 0;
  vertical-align: top;
  line-height: 35px;
  color: #fff;
  background-color: #956496;
  border-radius: 4px;
  text-align: center;
  text-transform: uppercase;
  padding: 0 30px;
`;
