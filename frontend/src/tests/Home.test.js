/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import Home from "../pages/Home/index";
import { Provider, useDispatch } from "react-redux";
import store from "../redux/store/store";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store/store";

describe("Home", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });
  test("it renders the home page", () => {
    const about = screen.getByLabelText("Home");
    expect(about).toBeTruthy();
  });
});
