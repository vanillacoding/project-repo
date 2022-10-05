import React from "react";
import { render } from "@testing-library/react";
import UserList from "./UserList";

describe("<UserList />", () => {
  it("should handle props", () => {
    const users = [
      { id: "user1", username: "Jeong", isConnected: true },
      { id: "user2", username: "Park", isConnected: false },
    ];
    const { getByText } = render(<UserList users={users} />);

    getByText("Jeong");
    getByText("Park");
  });
});
