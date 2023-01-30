import { fireEvent, getByTestId, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import ProjectsPage from "../pages/ProjectsPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => [, , , jest.fn, true],
  useParams: () => ({ projectId: "6358a08114561eb7fe31bb4d" }),
  useNavigate: jest.fn,
}));

jest.mock("react-markdown", () => function Mock({ children }) {
  return <div>{children}</div>
});

const mockCreateProject = jest.fn();
const mockEditProject = jest.fn();
const mockDeleteProject = jest.fn();
const mockData = {
  _id: "6358a08114561eb7fe31bb4d",
  title: "바닐라코딩",
};

jest.mock("../api/projectApi", () => ({
  getProject: () => mockData,
  createProject: () => mockCreateProject(),
  editProject: () => mockEditProject(),
  deleteProject: () => mockDeleteProject(),
}));

describe("ProjectDetailPage", () => {
  it("프로젝트 추가하기 버튼이 있어야 합니다.", async () => {
    render(<ProjectsPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(mockData._id)).toBeInTheDocument();
    });

    expect(screen.getByTestId("project-create-button")).toBeInTheDocument();
  });

  it("새로운 프로젝트 만들기 테스트", async () => {
    const inputValue = "testProject";

    render(<ProjectsPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(mockData._id)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("project-create-button"));
    fireEvent.change(screen.getByTestId("projectInput"), {
      target: { value: inputValue },
    });
    fireEvent.click(screen.getByTestId("projectSubmit"))

    await waitForElementToBeRemoved(() => screen.getByTestId("projectInput"));

    expect(mockCreateProject).toHaveBeenCalledTimes(1);
  });

  it("프로젝트 수정하기 테스트", async () => {
    render(<ProjectsPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(mockData._id)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("project-edit-button"));
    fireEvent.change(screen.getByTestId("projectInput"), {
      target: { value: "test" },
    });

    fireEvent.click(screen.getByTestId("projectSubmit"))

    await waitForElementToBeRemoved(() => screen.getByTestId("projectInput"));

    expect(mockEditProject).toHaveBeenCalledTimes(1);
  });

  it("프로젝트 삭제하기 테스트", async () => {
    render(<ProjectsPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(mockData._id)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("project-delete-button"));

    expect(mockDeleteProject).toHaveBeenCalledTimes(1);
  });
});
