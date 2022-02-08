/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store/store.js";

global.fetch = require("jest-fetch-mock");

import { Register } from "../pages";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Register", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    jest.resetAllMocks();
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it("creates a form element", () => {
    const form = screen.getByLabelText("register-form");
    expect(form).toBeTruthy();
  });

  it("has a submit button", () => {
    const button = screen.getByLabelText("regiaster-button");
    expect(button).toBeTruthy();
  });
});
