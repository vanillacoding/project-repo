import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5%;
  padding: 0.3em;
  background-color: #f8f5f5;
  margin-bottom: 1vh;
`;

const MailStatus = styled.div`
  flex-basis: 10%;
  border-radius: 0.5vw;
  padding: 1em;
  color: ${(props) => props.theme.statusColor.color};
  text-align: center;
  font-size: 0.5em;
  background-color: white;
`;

const MailContent = styled.div`
  flex-basis: 60%;
  width: 100%;
  height: 100%;
  margin-left: 2vw;
`;

const MailDate = styled.div`
  flex-basis: 20%;
  font-size: 0.6em;
  color: gray;
`;

function MailItem({
  mail,
  handleSelectMail,
}) {
  const {
    content,
    status,
    createdAt,
  } = mail;

  const date = new Date(createdAt).toISOString();

  return (
    <Container onClick={() => handleSelectMail(mail)}>
      <MailStatus>{status}</MailStatus>
      <MailContent>{content}</MailContent>
      <MailDate>{date.substring(0, 10)}</MailDate>
    </Container>
  );
}

MailItem.propTypes = {
  mail: PropTypes.object.isRequired,
  handleSelectMail: PropTypes.func.isRequired,
};

export default MailItem;
