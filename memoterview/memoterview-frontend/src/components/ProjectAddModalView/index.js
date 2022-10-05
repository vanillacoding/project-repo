import debounce from "lodash.debounce";
import React, { useState } from "react";
import styled from "styled-components";

import { searchInterviewers } from "../../api";
import useToken from "../../hooks/useToken";
import ModalView from "../ModalView";
import ProjectEvaluationOptionAddBar from "../ProjectEvaluationOptionAddBar";
import ProjectOptionItem from "../ProjectOptionItem";
import SearchField from "../SearchField";

const Title = styled.h2`
  text-align: center;
  font-size: 1.5em;
  font-weight: 500;
`;

const EditField = styled.div`
  margin: 40px 50px;
`;

const Label = styled.div`
  margin: 5px;
  font-size: 1.2em;
  font-weight: 400;
`;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 80%;
  height: 25px;
  font-size: 1em;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 90px;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 5px;
  width: 80px;
  height: 40px;
  background-color: ${(props) => props.buttonType === "ok" ? props.theme.GulfBlue : props.theme.Whisper};
  color: ${(props) => props.buttonType === "ok" ? props.theme.Snow : props.theme.GulfBlue};
  box-sizing: border-box;
  border-radius: 3px;
  font-weight: bold;
  transition: opacity .3s linear;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function ProjectAddModalView({ onCancelBtnClick, onCreateBtnClick }) {
  const [title, setTitle] = useState("");
  const [evaluationOptions, setEvaluationOptions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [category, setCategory] = useState("");
  const { token } = useToken();

  function handleCategory(event) {
    const { target: { value } } = event;

    setCategory(value);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleEvaluationOptionAdd(evaluationOption) {
    if (!evaluationOptions.find((option) => option === evaluationOption)){
      setEvaluationOptions(evaluationOptions.concat(evaluationOption));
    }
  }

  function handleEvaluationOptionDelete(deleteOptionId) {
    setEvaluationOptions(
      evaluationOptions.filter((option) => option !== deleteOptionId)
    );
  }

  function handleSelectInterviewer(interviewer) {
    if (
      !participants.find((participant) => participant.id === interviewer.id)
    ) {
      setParticipants(participants.concat(interviewer));
    }
  }

  const handleSearchInputChange = debounce(
    async (searchValue, viewSearchList) => {
      const result = await searchInterviewers({ email: searchValue, token });
      const searchList = result.data;

      viewSearchList(searchList);
    },
    200
  );

  function handleParticipantOptionDelete(deleteOptionId) {
    setParticipants(
      participants.filter((participant) => participant.id !== deleteOptionId)
    );
  }

  function handleOkBtnClick() {
    const newProject = {
      title,
      filters: evaluationOptions,
      participants: participants.map((participant) => participant.id),
      category,
    };

    onCreateBtnClick(newProject);
  }

  // todo. modalview padding, width, height 상수화
  // 최대 평가옵션, 면접관 상수화
  // 컴포넌트 나누기
  return (
    <ModalView padding="20px" width="700px" height="650px">
      <Title>면접 생성</Title>
      <EditField>
        <Label>인터뷰 제목</Label>
        <Input value={title} onChange={handleTitleChange} required/>
      </EditField>
      <EditField>
        <Label>평가 옵션</Label>
        {evaluationOptions.length < 4 && (
          <ProjectEvaluationOptionAddBar
            onEvaluationOptionAdd={handleEvaluationOptionAdd}
          />
        )}
        {evaluationOptions.map((evaluationOption, index) => (
          <ProjectOptionItem
            key={evaluationOption + index}
            id={evaluationOption}
            option={evaluationOption}
            onOptionDelete={handleEvaluationOptionDelete}
          />
        ))}
      </EditField>
      <EditField>
        <Label>참여 면접관</Label>
        {participants.length < 4 && (
          <SearchField
            onSearchInputChange={handleSearchInputChange}
            onSelectSearchResult={handleSelectInterviewer}
          />
        )}
        {participants.map((participant) => (
          <ProjectOptionItem
            key={participant.id}
            id={participant.id}
            option={participant.name}
            onOptionDelete={handleParticipantOptionDelete}
          />
        ))}
      </EditField>
      <EditField>
        <Label>카테고리</Label>
        <Input value={category} onChange={handleCategory} required/>
      </EditField>
      <BtnGroup>
        <Button buttonType="cancel" onClick={onCancelBtnClick}>취소</Button>
        <Button buttonType="ok" onClick={handleOkBtnClick}>생성</Button>
      </BtnGroup>
    </ModalView>
  );
}
