import styled from "styled-components";
import SubTitle from "./shared/SubTitle";
import Title from "./shared/Title";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  overflow: scroll;
  transform: translate(-50%, -50%);

  img {
    border: 1px solid black;
    border-radius: 10px;
    width: 800px;
  }
`;

export default function Instruction() {
  return (
    <Wrapper>
      <Title>HOW TO USE IT</Title>

      <SubTitle>1. Drag & Fix Your Domain Node</SubTitle>
      <img alt="drag-gif" src="../images/instruction/instruction-drag.gif" />

      <SubTitle>2. Double Click to UnFix your Node</SubTitle>
      <img alt="drag-gif" src="../images/instruction/instruction-double-click.gif" />

      <SubTitle>3. Filter By Date & Domain</SubTitle>
      <img alt="drag-gif" src="../images/instruction/instruction-filter.gif" />

      <SubTitle>4. Right Click See & Modify Node Detail</SubTitle>
      <img alt="drag-gif" src="../images/instruction/instruction-detail.gif" />

      <SubTitle>5. Delete Your Domain Node</SubTitle>
      <img alt="drag-gif" src="../images/instruction/instruction-delete.gif" />

      <SubTitle>6. Save & Share Your Domain Node</SubTitle>
      <img alt="drag-gif" src="../images/instruction/instruction-save-share.gif" />
    </Wrapper>
  );
}
