import { useState } from "react";
import { useRouter } from "next/router";

import fetchData from "@/utils/fetchData";

function useReviewForm(productId, toggle) {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [reviewData, setReviewData] = useState({
    productId,
    comment: "",
    picture: "",
    recycleScore: 3,
    preferenceScore: 3,
  });

  function handleChange(e) {
    const { name } = e.target;
    const { value } = e.target;

    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetchData("POST", "/api/review", reviewData);

    if (response.result) {
      toggle();
      router.replace(router.asPath);
      return;
    }

    setMessage("다시 시도해주세요.");
  }

  return {
    message,
    reviewData,
    handleChange,
    handleSubmit,
  };
}

export default useReviewForm;
