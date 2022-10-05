import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import CustomAlbum from "./CustomAlbum";
import CustomGrid from "./CustomGrid";
import { setError } from "../features/errorSlice";
import STATUS_CODES from "../constants/statusCodes";
import { ERROR } from "../constants/messages";

function CustomCategory() {
  const { customCategories } = useSelector((state) => state.user);
  const { category: categoryName } = useParams();
  const dispatch = useDispatch();

  const categoryInfo = customCategories
    .find(({ category }) => category === categoryName);

  if (!categoryInfo) {
    const statusCode = STATUS_CODES.NOT_FOUND;
    const message = ERROR.NOT_FOUND;

    dispatch(setError({ statusCode, message }));

    return null;
  }

  const { categoryType } = categoryInfo;
  const customPage = categoryType === "grid" ? <CustomGrid /> : <CustomAlbum />;

  return customPage;
}

export default CustomCategory;
