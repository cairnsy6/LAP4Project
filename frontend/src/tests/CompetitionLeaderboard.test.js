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
  let mockFunction;
  global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{name: "test name", description: "test desc", units: "test units", frquency:1}])
  })
);
  beforeEach(() => {
    // mockFunction=jest.fn().mockReturnValue([{name: "test name", description: "test desc", units: "test units", frquency:1}])
    fetch.mockClear();
    render(
      <Provider store={store}>
        <CompetitionLeaderboard />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });

  test("it renders the leaderboard page", () => {
    const leaderboard = screen.getByLabelText("leaderboard");
    expect(leaderboard).toBeTruthy();
  });
});
