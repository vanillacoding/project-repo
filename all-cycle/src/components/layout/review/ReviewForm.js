import { useSession } from "next-auth/client";

import AccessDenied from "@/components/element/AccessDenied";
import useReviewForm from "@/hooks/useReviewForm";
import StyledButton from "@/components/element/StyledButton";
import Range from "@/components/layout/review/Range";
import {
  Form,
  FormGroup,
  Textarea,
  FigCaption,
  Message,
  ButtonWrapper,
} from "@/components/layout/review/styled/FormStyled";

function ReviewForm({ productId, toggle }) {
  const [session] = useSession();

  if (!session) {
    return <AccessDenied />;
  }

  const {
    message,
    reviewData,
    handleChange,
    handleSubmit,
  } = useReviewForm(productId, toggle);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        한줄평
        {(message) && <Message>{message}</Message>}
        <Textarea
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
        />
      </FormGroup>

      <FigCaption>
        재활용하기 편했다면 높은 점수를 줘 칭찬해주세요!
      </FigCaption>
      <Range
        name="recycleScore"
        value={reviewData.recycleScore}
        onChange={handleChange}
      />

      <FigCaption>
        다음에도 이 제품을 또 구매하실건가요?
      </FigCaption>
      <Range
        name="preferenceScore"
        value={reviewData.preferenceScore}
        onChange={handleChange}
      />

      <ButtonWrapper>
        <StyledButton onClick={toggle}>취소</StyledButton>
        <StyledButton type="submit">작성완료</StyledButton>
      </ButtonWrapper>
    </Form>
  );
}

export default ReviewForm;
