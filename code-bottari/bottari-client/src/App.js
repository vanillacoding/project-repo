import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";

import GlobalStyle from "./constants/styledComponent/GlobalStyle";
import AppHeader from "./components/AppHeader/AppHeader";
import Main from "./components/Main/Main";
import NewSnippetPage from "./components/NewSnippetPage/NewSnippetPage";
import SnippetDetailPage from "./components/SnippetDetailPage/SnippetDetailPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UserInformation from "./components/UserInformationPage/UserInformation";
import Greeting from "./components/Greeting/Greeting";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Footer from "./components/Footer/Footer";

const Message = styled.div`
  margin-top: 40vh;
  text-align: center;
  font-size: 30px;
`;

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  const isMobile = navigator.userAgentData.mobile;

  if (isMobile) {
    return <Message>모바일 환경에서는<br />이용이 불가합니다.</Message>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle />
        <AppHeader />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/snippets/new" component={NewSnippetPage} />
          <Route path="/snippets/:id" component={SnippetDetailPage} />
          <Route path="/users/register" component={RegisterPage} />
          <Route path="/users/:id" component={UserInformation} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/slack/greeting" component={Greeting} />
        </Switch>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}
