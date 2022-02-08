/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { CompetitionLeaderboard } from "../pages";
import { store } from "../redux/store/store";

describe("CompetitionLeaderboard", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CompetitionLeaderboard />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });

  test("it renders the home page", () => {
    const leaderboard = screen.getByLabelText("leaderboard");
    expect(leaderboard).toBeTruthy();
  });
});
