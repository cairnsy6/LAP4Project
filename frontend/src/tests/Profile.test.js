/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import { Profile } from "../pages";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store/store";

global.fetch = require("jest-fetch-mock");

describe("Profile", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    jest.resetAllMocks();
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  test("it renders the profile page", () => {
    const profile = screen.getByLabelText("Profile");
    expect(profile).toBeTruthy();
  });
});
