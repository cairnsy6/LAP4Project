/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store/store.js";

// global.fetch = require("jest-fetch-mock");

import { Register } from "../pages";

// const mockedUsedNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockedUsedNavigate,
// }));

describe("Register", () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({
  json: () => Promise.resolve([{user: {id: 1}, token: 'test token'}])
  }))
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    jest.resetAllMocks();
  });

  it("creates a form element", () => {
    const form = screen.getByLabelText("register-form");
    fireEvent.submit(form, {preventDefault: jest.fn(), target: {username: "test", password: "1234", passwordconfirm: "1234"}})
    expect(form).toBeInTheDocument()
  });

  it("has a submit button", () => {
    const button = screen.getByLabelText("register-button");
    expect(button).toBeTruthy();
  });
});
