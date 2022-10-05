import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MailItem from "./shared/MailItem";
import StyledButton from "./shared/StyledButton";
import useMailList from "../hooks/useMailList";

const Container = styled.div`
  width: 100%;
  min-height: 40vh;
  height: 100%;
  margin-top: 1em;
`;

const Content = styled.div`
  /* width: 100%;
  height: 100%;
  min-height: 30vh;
  padding: 1em;
  border-radius: 0.2em; */
  display: block;
  width: 50vmin;
  height: 35vmin;
  margin: 1vw auto;
  background-color: ${(props) => props.theme.layoutBg3.color};
  border-radius: 10px;
  resize: none;
  outline: none;
  padding: 1em;
`;

const ContentName = styled.div`
  width: 100%;
  padding: 0.5em;
  margin-bottom: 2vh;
  color: ${(props) => props.theme.headerColor.color};
  font-size: 1.5em;
  font-weight: 400;
  border-bottom: 1px solid ${(props) => props.theme.cardBorder.color};
`;

const ContentDetail = styled.div`
  padding: 1em;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5em;
`;

function MailboxList({ toggle }) {
  const {
    mailList,
    isDetail,
    selectedMail,
    handleClose,
    handleSelectMail,
    handleDeleteMailItem,
    handleDeleteMailList,
  } = useMailList();

  return (
    <Container>
      {isDetail ? (
        <>
          <Content>
            <ContentName>{selectedMail.name}</ContentName>
            <ContentDetail>{selectedMail.content}</ContentDetail>
          </Content>
          <Buttons>
            <StyledButton onClick={() => handleDeleteMailItem(selectedMail._id)}>
              삭제 ❎
            </StyledButton>
            <StyledButton onClick={handleClose}>
              확인 ✅
            </StyledButton>
            <StyledButton>
              <Link
                to={`/room/${selectedMail.sender}`}
                onClick={toggle}
              >
                친구집 방문하기 🏠
              </Link>
            </StyledButton>
          </Buttons>
        </>
      ) : (
        <>
          {mailList
            && mailList.mails.map((mail) => (
              <MailItem
                key={mail._id}
                mail={mail}
                handleClose={handleClose}
                handleSelectMail={() => handleSelectMail(mail)}
              />
            ))}
          <Buttons>
            <StyledButton onClick={handleDeleteMailList}>
              모두 삭제 ❌
            </StyledButton>
            <StyledButton onClick={toggle}>
              닫기 🔙
            </StyledButton>
          </Buttons>
        </>
      )}
    </Container>
  );
}

MailboxList.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default MailboxList;
