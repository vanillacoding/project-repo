import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import IntervieweeDetailContainer from "../../containers/IntervieweeDetailContainer";
// import IntervieweePageContainer from "../../containers/IntervieweePageContainer";
import InterviewPageContainer from "../../containers/InterviewPageContainer";
import LoginPageContainer from "../../containers/LoginPageContainer";
import ProjectsContainer from "../../containers/ProjectsContainer";
import SearchContainer from "../../containers/SearchContainer";
import TotalResultContainer from "../../containers/TotalResultContainer";
import WelcomeContainer from "../../containers/WelcomeContainer";
import theme from "../../Layout/theme/theme";
import Dummy from "../../pages/dummy";
import InterviewEndPage from "../../pages/InterviewEndPage";
import Projects from "../../pages/Projects";
import AuthRoute from "../AuthRoute";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact>
          <LoginPageContainer />
        </Route>
        <Route path="/welcome/:projectId/:intervieweeId" >
          <WelcomeContainer />
        </Route>
        <AuthRoute path="/projects" exact>
          <ProjectsContainer />
        </AuthRoute>
        <AuthRoute path="/projects/:projectId" exact >
          <TotalResultContainer />
        </AuthRoute>
        <AuthRoute path="/projects/:projectId/search">
          <SearchContainer />
        </AuthRoute>
        <AuthRoute path="/interview/:projectId/:intervieweeId">
          <InterviewPageContainer />
        </AuthRoute>
        <Route path="/interviewee/:projectId/:intervieweeId">
          <InterviewPageContainer />
        </Route>
        <AuthRoute path="/result/:projectId/:intervieweeId">
          <IntervieweeDetailContainer />
        </AuthRoute>
        <Route path="/interviewEnd">
          <InterviewEndPage />
        </Route>
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </ThemeProvider>
  );
}
