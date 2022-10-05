import { Container, AnswerButton, ButtonContainer } from "@/components/layout/quiz/styled/OptionsStyled";
import TextOptions from "@/components/layout/quiz/TextOptions";
import ImageOptions from "@/components/layout/quiz/ImageOptions";

function OptionList({
  examples,
  images,
  alts,
  checkAnswer,
  selectedOption,
  handleSelectOption,
}) {
  return (
    <Container>
      <ButtonContainer>
        {selectedOption
          && <AnswerButton onClick={checkAnswer}>정답확인</AnswerButton>}
      </ButtonContainer>

      {examples && (
        <TextOptions
          list={examples}
          handleSelectOption={handleSelectOption}
        />
      )}

      {images && (
        <ImageOptions
          list={images}
          alts={alts}
          handleSelectOption={handleSelectOption}
        />
      )}
    </Container>
  );
}

export default OptionList;
