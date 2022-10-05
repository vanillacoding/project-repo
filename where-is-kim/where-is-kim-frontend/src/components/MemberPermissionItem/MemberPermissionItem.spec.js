import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MemberPermissionItem from "./MemberPermissionItem";

describe("<MemberPermissionItem />", () => {
  it("should handle props", () => {
    const eventValidator = [];
    const mockCallback = jest.fn((id) => eventValidator.push(id));
    const { getByText, getByDisplayValue, container } = render(
      <MemberPermissionItem
        id="user1"
        username="Jeong"
        isAdmin={true}
        onChange={mockCallback}
      />
    );
    const select = container.querySelector("select");

    getByText("Jeong");
    getByDisplayValue("admin");
    fireEvent.change(select, { target: { value: "normal" } });
    getByDisplayValue("normal");
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(eventValidator).toEqual(["user1"]);
  });
});
