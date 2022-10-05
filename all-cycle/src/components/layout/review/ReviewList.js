import ReviewItem from "@/components/layout/review/ReviewItem";
import {
  Container,
  Title,
  ReviewButton,
} from "@/components/layout/review/styled";

function ReviewList({ reviews, toggle }) {
  return (
    <Container>
      <Title>
        REVIEW
        <ReviewButton onClick={toggle}>
          작성하기
        </ReviewButton>
      </Title>
      {reviews?.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </Container>
  );
}

export default ReviewList;
