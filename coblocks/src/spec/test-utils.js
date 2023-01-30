import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Routes, Route, MemoryRouter } from "react-router-dom";

import { store } from "../app/configureStore";

import { Home } from "../pages/Home/Home";
import { Tutorial } from "../pages/Tutorial/Tutorial";
import { GameList } from "../pages/GameList/GameList";
import { Game } from "../pages/Game/Game";
import { Error } from "../pages/Error/Error";
import { NotFound } from "../pages/NotFound/NotFound";

function renderWithProvider(initialEntries) {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial/:tutorialId" element={<Tutorial />} />
          <Route path="/game_list" element={<GameList />} />
          <Route path="/game/:gameId" element={<Game />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

export { renderWithProvider };
