import React from "react";
import { screen } from "@testing-library/react";

import App from "../App";
import History from "../pages/History";
import Prescription from "../pages/Prescription";
import { customRender, history } from "../setupTests";
import PrivateRoute from "../components/Shared/PrivateRoute";

describe("<App />", () => {
  it("matches snapshot", () => {
    const { container } = customRender(<App />);

    expect(container).toMatchSnapshot();
  });

  it("should be render login page if user is not loggined in", () => {
    customRender(<App />);
    history.push("/");

    expect(screen.getByText("Google Login")).toBeInTheDocument();
  });

  it("should be render each component matching correct path", () => {
    customRender(<History />);
    history.push("/history");

    expect(screen.getByText("Prescription History")).toBeInTheDocument();
  });

  it("should go to private path when user logged in", () => {
    const user = {
      created_at: "2021-08-31T18:07:09.000Z",
      email: "test@gmail.com",
      exp: 1633002544,
      iat: 1632397744,
      name: "전예림",
      notification_token: null,
      pharmacy_address: "12345 dfghj, Lake Jeremiemouth",
      pharmacy_name: "kenken pharmacy",
      picture: "https://test.com",
      user_id: "test-id",
      user_type: "pharmacist",
    };

    customRender(
      <PrivateRoute
        path="/prescription"
        isAuthenticated={user}
        component={Prescription}
        userInfo={user}
      />,
    );

    history.push("/prescription");

    expect(screen.getByText("처방")).toBeInTheDocument();
    expect(screen.getByText("대기 환자를 선택해주세요.")).toBeInTheDocument();
  });
});
