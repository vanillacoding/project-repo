import { useSession } from "next-auth/client";

import NextLink from "@/components/element/NextLink";
import Badge from "@/components/element/Badge";
import {
  ModalContainer,
  ButtonContainer,
  Toggle,
  Answer,
  Description,
} from "@/components/layout/quizModal/styled";

function AnswerModal({
  slug,
  realAnswer,
  result,
  description,
  handleReset,
}) {
  const [session] = useSession();

  return (
    <ModalContainer>
      <ButtonContainer>
        {result ? (
          <>
            <Toggle>정답</Toggle>
            <Toggle>
              <NextLink href={session ? "/myPage" : "/api/auth/signin"}>
                뱃지 확인하러 가기
              </NextLink>
            </Toggle>
          </>
        ) : (
          <>
            <Toggle onClick={handleReset}>다시풀기</Toggle>
            <Toggle>
              <NextLink href="/quiz">다른 문제 풀어보러 가기</NextLink>
            </Toggle>
          </>
        )}
      </ButtonContainer>

      <Answer>
        <Toggle result={result?.toString()}>
          {result ? "정답" : "오답"}
        </Toggle>
        {" "}
        {realAnswer}
      </Answer>

      <Description>{description}</Description>
      <Badge
        name={slug}
        alt={slug}
        width={100}
        height={slug === "plastic1" || slug === "glass1" ? 100 : 110}
        isinpocket={result?.toString()}
      />
    </ModalContainer>
  );
}

export default AnswerModal;
