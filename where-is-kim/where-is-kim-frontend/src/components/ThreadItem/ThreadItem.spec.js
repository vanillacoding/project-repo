import React from "react";
import { render } from "@testing-library/react";
import ThreadItem from "./ThreadItem";
import "../../moment.config";

describe("<ThreadItem />", () => {
  it("should handle props", () => {
    const { getByText, container } = render(
      <ThreadItem
        userId="userId"
        username="Jeong"
        profile="user.jpg"
        text="Jeong이 좀 아까 출근했습니다."
        createdAt={Date.now()}
        userNameById={{ userId: "Jeong" }}
        showComment={false}
        comment={{ value: "text", onChange: () => {} }}
        likes={[]}
        comments={[]}
      />
    );

    expect(container.querySelector('img[src="user.jpg"]')).toBeTruthy();
    getByText("Jeong");
    getByText("Jeong이 좀 아까 출근했습니다.");
    getByText("방금 전");
  });
});
