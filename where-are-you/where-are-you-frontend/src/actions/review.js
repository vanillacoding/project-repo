import * as type from "../constants/actionTypes";

export const saveReviews = (reviews, page) => ({
  type: type.SAVE_REVIEWS,
  reviews,
  page
});

export const createReview = (review) => ({
  type: type.CREATE_REVIEW,
  review
});
