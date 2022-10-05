import { useState } from "react";
import { useSession } from "next-auth/client";

import fetchData from "@/utils/fetchData";

function useKeyword(sortWithKeyword, handleError) {
  const [keyword, setKeyword] = useState("");
  const [session] = useSession();

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (session?.user.email) {
        const response = await fetchData(
          "POST",
          `/api/user/${session?.user.email}`,
          keyword,
        );

        if (!response.result) {
          handleError(response.error);
          return;
        }
      }

      sortWithKeyword(keyword);
    } catch (err) {
      handleError(err.message);
    }
  }

  return {
    keyword,
    handleChange,
    handleSubmit,
  };
}

export default useKeyword;
