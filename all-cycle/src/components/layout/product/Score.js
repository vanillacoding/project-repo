import ScoreBar from "@/components/layout/product/ScoreBar";
import { ScoreFigure, Number, Title } from "@/components/layout/product/styled/ScoreStyled";

function Score({ name, score }) {
  return (
    <ScoreFigure>
      <Title>
        {name}
        <Number>({score})</Number>
      </Title>
      <ScoreBar
        score={score}
        width={20}
        height={2}
      />
    </ScoreFigure>
  );
}

export default Score;
