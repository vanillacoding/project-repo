import styled from "styled-components";

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 80px;
`;

const Label = styled.label`
  font-size: 12px;
  margin-bottom: 0px;
  color: #543FD3;
`;

const Input = styled.input`
  display: block;
  width: 230px;
  height: 30px;
  border: 2px solid #543FD3;
  border-radius: 4px;
  outline: none;
  transition: 0.2s;

  &:focus {
    border: 2px solid #26BFA6;
  }

  &::placeholder {
    font-size: 14px;
  }
`;

const Message = styled.p`
  font-size: 12px;
  margin: 0px;
  color: #543FD3;
  text-align: right;
`;

export default function Nickname({ reference, message }) {
  return (
    <NicknameWrapper>
      <Label>
        닉네임
        <Input type="text" placeholder="닉네임을 입력해 주세요." ref={reference} />
      </Label>
      <Message>{message}</Message>
    </NicknameWrapper>
  );
}
