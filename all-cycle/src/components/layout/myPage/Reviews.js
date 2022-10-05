import { ReviewList, Content, Score } from "@/components/layout/myPage/styled/ReviewsStyled";

function Reviews({ reviews }) {
  return (
    <ReviewList>
      {reviews?.map((review) => (
        <Content key={review._id}>
          {review.productId.name}
          <Score>
            재활용 점수: {review.recycleScore}
          </Score>
        </Content>
      ))}
    </ReviewList>
  );
}

export default Reviews;
