import React, { useState } from "react";
import styled from "styled-components";

import ModalView from "../ModalView";
import TotalResultFilterModalCheckBox from "./TotalResultFilterModalItem";

const Title = styled.h1`
  text-align: center;
  font-size: 1.7em;
`;

const FilterListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 30px;
  margin-left: 30px;
  padding: 30px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 40px;
  font-size: 1em;
  margin: 5px;
  cursor: pointer;
  transition: opacity 0.3s linear;
  border-radius: 2px;
  background-color: ${(props) =>
    props.buttonType === "ok" ? props.theme.GulfBlue : props.theme.Whisper};
  color: ${(props) =>
    props.buttonType === "ok" ? props.theme.Snow : props.theme.GulfBlue};
  &:hover {
    opacity: 0.8;
  }
`;

const BtnGroup = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
`;

export default function TotalResultFilterModalView({
  defaultFilterOption,
  onCancleBtnClick,
  onApplyBtnClick,
}) {
  const [filterOptions, setFilterOptions] = useState(defaultFilterOption);

  function handleFilterApplyBtnClick() {
    onApplyBtnClick(filterOptions);
  }

  function handleFilterCheckedChange(checked, filter) {
    setFilterOptions(
      filterOptions.map((filterOption) =>
        filterOption.filter === filter ? { filter, checked } : filterOption
      )
    );
  }

  return (
    <ModalView padding="20px" width="500px" height="440px">
      <Title>결과옵션필터</Title>
      <FilterListWrapper>
        {filterOptions.map((filterOption) => (
          <TotalResultFilterModalCheckBox
            key={filterOption.filter}
            label={filterOption.filter}
            defaultChecked={filterOption.checked}
            onCheckedChange={handleFilterCheckedChange}
          />
        ))}
      </FilterListWrapper>
      <BtnGroup>
        <Button buttonType="cancel" onClick={onCancleBtnClick}>
          취소
        </Button>
        <Button buttonType="ok" onClick={handleFilterApplyBtnClick}>
          적용
        </Button>
      </BtnGroup>
    </ModalView>
  );
}
