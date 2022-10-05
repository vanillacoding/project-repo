import styled from "styled-components";

import RegisterCard from "../RegisterPage/RegisterCard/RegisterCard";

const CardWrqpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export default function RegisterPage() {
  return (
    <CardWrqpper>
      <h1>사용자 정보 등록</h1>
      <RegisterCard />
    </CardWrqpper>
  );
}
