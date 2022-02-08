/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import Profile from "../pages/Profile/index";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store/store";

describe("Register", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <About />
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
