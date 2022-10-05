import React from "react";
import { render } from "@testing-library/react-native";

import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";

import {
  TEST_TEXT,
  MOCK_DATE,
  MOCK_USER_NAME,
  MOCK_USER_EMAIL
} from "../../constants/testContents";

describe("<CategoryPostCard />", () => {
  const mockPostInfo = {
    title: TEST_TEXT,
    isAnonymous: true,
    createdAt: MOCK_DATE,
    likes: [MOCK_USER_EMAIL],
    ownerNickname: MOCK_USER_NAME
  };

  it("sholud postInfo empty Object (empty data)", () => {
    const categoryPostCardInfo = render(
      <CategoryPostCard postInfo={{}} />
    );

    expect(categoryPostCardInfo.container.children.length).toBe(0);
  });

  it("should render CategoryPostCard texts (isAnonymous is true)", () => {
    const { getByText } = render(
      <CategoryPostCard postInfo={mockPostInfo} />
    );

    expect(getByText("익명")).toBeTruthy();
    expect(getByText(mockPostInfo.title)).toBeTruthy();
    expect(getByText(mockPostInfo.createdAt)).toBeTruthy();
    expect(getByText(mockPostInfo.likes.length.toString())).toBeTruthy();
  });

  it("should render CategoryPostCard texts (isAnonymous is false)", () => {
    mockPostInfo.isAnonymous = false;

    const { getByText } = render(
      <CategoryPostCard postInfo={mockPostInfo} />
    );

    expect(getByText(mockPostInfo.ownerNickname)).toBeTruthy();
  });

  it("sholud post title length over 9", () => {
    mockPostInfo.title = "the mock post title over 9";

    const { getByText } = render(
      <CategoryPostCard postInfo={mockPostInfo} />
    );

    expect(getByText(mockPostInfo.title.substring(0, 8) + "...")).toBeTruthy();
  });
});
