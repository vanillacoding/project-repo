import { useHistory, useLocation } from "react-router";
import styled from "styled-components";

import Button from "../common/Button";

import { HOME } from "../../constants/variants";
import { TO_HOME } from "../../constants/names";

const ErrorPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FailureReason = styled.p`
  margin: 270px 0px 20px;
  font-size: 60px;
`;

const Message = styled.p`
  font-size: 18px;
`;

export default function ErrorPage() {
  const history = useHistory();
  const { state } = useLocation();

  const { message } = state;

  const handleClick = () => {
    history.push("/");
  };

  return (
    <ErrorPageWrapper>
      <FailureReason>{message}</FailureReason>
      <Message>아래의 버튼을 눌러 홈으로 돌아가세요.</Message>
      <Button variant={HOME} onClick={handleClick} children={TO_HOME} />
    </ErrorPageWrapper>
  );
}
