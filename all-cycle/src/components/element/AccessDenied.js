import { signIn } from "next-auth/client";
import styled from "styled-components";

import StyledButton from "@/components/element/StyledButton";

const Container = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function AccessDenied() {
  return (
    <Container>
      <StyledButton onClick={signIn}>로그인이 필요합니다</StyledButton>
    </Container>
  );
}

export default AccessDenied;
