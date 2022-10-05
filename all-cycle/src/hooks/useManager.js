import { useState } from "react";

import fetchData from "@/utils/fetchData";

function useManager(productList) {
  const [updatedList, setUpdatedList] = useState(productList);
  const [count, setCount] = useState("");
  const [message, setMessage] = useState("");

  async function crawlData(e) {
    e.preventDefault();

    try {
      const response = await fetchData("GET", "/api/manager");
      setCount(response.count);
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function updateData(e) {
    e.preventDefault();

    try {
      const response = await fetchData("PUT", "/api/product", updatedList);
      setMessage(response.data);
      return;
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function handleChange(e, _id, name) {
    const { value } = e.target;

    setUpdatedList((prev) => prev.map((product) => {
      if (product._id !== _id) {
        return product;
      }

      return { ...product, [name]: value };
    }));
  }

  return {
    count,
    message,
    crawlData,
    updateData,
    handleChange,
  };
}

export default useManager;
