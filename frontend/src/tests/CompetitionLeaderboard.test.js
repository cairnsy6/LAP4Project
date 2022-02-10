/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider} from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { CompetitionLeaderboard } from "../pages";
import { store } from "../redux/store/store";

describe("CompetitionLeaderboard", () => {
  const redux = require('react-redux')
  let mockFunction;
  global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({name: "test name", description: "test desc", units: "test units", frquency:1, scores: [{id:1,user_id:1, last_updated: "2022-04-01", user: {username: "test", }}]}),
    ok: true,
  })
);
  beforeEach(async() => {
    jest.spyOn(localStorage, "getItem");
    localStorage.getItem = jest.fn();
    jest.spyOn(redux, 'useSelector');
    redux.useSelector = jest.fn().mockReturnValue(true);
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

  test("updates score", () => {
    const form = screen.getByLabelText("update-score")
    fireEvent.submit(form, {preventDefault: jest.fn()})
    expect(form).toBeInTheDocument()
  })
});
