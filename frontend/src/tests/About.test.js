/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import About from "../pages/About/index";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store/store";

describe("About", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <About />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });
  test("it renders the about page", () => {
    const about = screen.getByLabelText("About");
    expect(about).toBeTruthy();
  });
});
