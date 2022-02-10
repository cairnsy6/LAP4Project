/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { CompetitionList } from "../pages";
import { store } from "../redux/store/store";

describe("CompetitionList", () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{id: 1, name: "test name", description: "test desc", units: "test units", frquency:1, end_date: "2022-04-01"}])
    })
  );
  beforeAll(() => {
    fetch.mockClear();
    render(
      <Provider store={store}>
        <CompetitionList />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });

  test("it renders the competition list page", () => {
    const competitionList = screen.getByLabelText("competition-list");
    expect(competitionList).toBeTruthy();
  });
});
