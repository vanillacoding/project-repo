import { getAllQuizList } from "@/utils/quizAPI";
import QuizList from "@/components/layout/quiz/List";
import {
  Container,
  Message,
  H3,
  Text,
  CreatedBy,
} from "@/components/layout/quiz/styled/index";

function Quiz({ allQuizList }) {
  return (
    <Container>
      <Message>
        <H3>재활용 상식퀴즈</H3>
        <Text>문제를 맞추고 <br /> 뱃지를 획득하세요</Text>
        <CreatedBy>
          <a href="https://www.freepik.com/vectors/badge">Badge vector created by pikisuperstar - www.freepik.com</a>
        </CreatedBy>
      </Message>

      <QuizList quizList={allQuizList} />
    </Container>
  );
}

export default Quiz;

export async function getStaticProps() {
  const allQuizList = getAllQuizList([
    "slug",
    "question",
    "examples",
    "answer",
    "realAnswer",
    "description",
    "category",
  ]);

  return {
    props: { allQuizList },
  };
}
