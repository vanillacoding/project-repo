import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as PIXI from 'pixi.js';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Landing from './LandingPage';
import Plant from './PlantPage';
import SelectPlant from './SelectPlantPage';
import CreatePlant from './CreatePlantPage';
import ErrorBox from '../components/ErrorBox';
import ErrorBoundary from '../components/ErrorBoundary';

import { isImageLoadDone } from '../redux/modules/images';

import theme from '../assets/styles/theme';
import wall from '../assets/images/furniture/wall.jpg';
import { imagePath } from '../constants/pixi';

const loader = PIXI.Loader.shared;

export default function AppPage() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const { isDone } = useSelector((state) => state.images);

  useEffect(() => {
    if (isDone) return;

    loader.reset();
    PIXI.utils.clearTextureCache();
    imagePath.forEach(({ alias, path }) => {
      loader.add(alias, path);
    });

    loader.load();

    loader.onComplete.add(() => {
      dispatch(isImageLoadDone());
    });
  }, []);

  function privateRoute(Component) {
    return isLogin ? <Component /> : <Redirect to={{ pathname: '/' }} />;
  }

  function notFoundErrorComponent() {
    return <ErrorBox message="페이지를 찾을 수 없습니다." />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Wrapper>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/plants/:plantId"
                component={() => privateRoute(Plant)}
              />
              <Route
                exact
                path="/create"
                component={() => privateRoute(SelectPlant)}
              />
              <Route
                exact
                path="/create/:plantNumber"
                component={() => privateRoute(CreatePlant)}
              />
            </ErrorBoundary>
            <Route component={notFoundErrorComponent} />
          </Switch>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GowunBatang-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  body {
    min-width: 320px;
    min-height: 100vh;
    line-height: 1;
    overflow-x: hidden;
    background: ${({ theme }) => theme.baseTheme.colors.darkGreen};
    font-family: 'GowunBatang-Regular';
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    z-index:2;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${wall});
  position: relative;
  z-index: 1;
  text-align: center;
  border-radius: 1.5rem;
  width: 1200px;
  height: 700px;
`;
