/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import NavBar from "../components/NavBar/index";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store/store";

describe("NavBar", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });
  test("it renders the navbar ", () => {
    const about = screen.getByLabelText("NavBar");
    expect(about).toBeTruthy();
  });
});
