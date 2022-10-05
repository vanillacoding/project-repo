import Score from "@/components/layout/product/Score";

function ScoreContainer({ recycleScoreAvg, preferenceScoreAvg }) {
  return (
    <>
      <Score
        name="재활용 점수"
        score={recycleScoreAvg}
      />
      <Score
        name="선호도 점수"
        score={preferenceScoreAvg}
      />
    </>
  );
}

export default ScoreContainer;
