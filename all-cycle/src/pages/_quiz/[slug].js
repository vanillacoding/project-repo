import { getAllQuizList, getQuizBySlug } from "@/utils/quizAPI";
import useQuiz from "@/hooks/useQuiz";
import QuizOptionList from "@/components/layout/quiz/OptionList";
import Message from "@/components/element/Message";
import {
  Container,
  Question,
  Category,
  AnswerModal,
  StyledModal,
} from "@/components/layout/quiz/styled/[slug]Styled";

function Quiz({ quiz }) {
  const {
    slug,
    question,
    answer,
    realAnswer,
    description,
    examples,
    images,
    alts,
    category,
  } = quiz;

  const {
    result,
    error,
    showAnswer,
    selectedOption,
    handleSelectOption,
    checkAnswer,
    handleReset,
  } = useQuiz(answer, slug);

  return (
    <Container>
      {!showAnswer && (
        <>
          <Category size={0.7}>{category}</Category>
          <Question>
            {question}
          </Question>
        </>
      )}

      {error && (
        <StyledModal>
          <Message>{error}</Message>
        </StyledModal>
      )}

      {showAnswer
        ? (
          <StyledModal>
            <AnswerModal
              realAnswer={realAnswer}
              result={result}
              description={description}
              handleReset={handleReset}
              slug={slug}
            />
          </StyledModal>
        ) : (
          <QuizOptionList
            slug={slug}
            examples={examples}
            images={images}
            alts={alts}
            checkAnswer={checkAnswer}
            selectedOption={selectedOption}
            handleSelectOption={handleSelectOption}
          />
        )}
    </Container>
  );
}

export default Quiz;

export async function getStaticProps({ params }) {
  const quiz = getQuizBySlug(params.slug, [
    "slug",
    "question",
    "answer",
    "realAnswer",
    "description",
    "examples",
    "images",
    "alts",
    "category",
  ]);

  return {
    props: { quiz },
  };
}

export async function getStaticPaths() {
  const quizList = getAllQuizList(["slug"]);

  return {
    paths: quizList.map((quiz) => ({
      params: {
        slug: quiz.slug,
      },
    })),
    fallback: false,
  };
}
