import { useState, useEffect } from "react";

import { saveReviews } from "../actions/review";
import { fetchReviews } from "../api";

const useFetchReviews = (page, dispatch) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const getReviews = async (page) => {
      try {
        setIsLoading(true);
        const response = await fetchReviews(page);

        if (response.status !== 200) {
          setError("리뷰를 불러올 수 없습니다. 다시 시도해주세요.");
          return;
        }

        const { data } = await response.json();

        dispatch(saveReviews(data, page));
        setHasMore(data.length > 0);
      } catch (err) {
        setError("리뷰를 불러올 수 없습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    getReviews(page);
  }, [page]);

  return { isLoading, error, hasMore };
};

export default useFetchReviews;
