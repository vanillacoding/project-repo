import { Container, Bar } from "@/components/layout/product/styled/ScoreStyled";

function ScoreBar({ width, height, score = 3 }) {
  return (
    <Container width={width} height={height}>
      <Bar size={Math.floor((score / 5) * 100)} />
    </Container>
  );
}

export default ScoreBar;
