/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../pages";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

describe("Login", () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({
  json: () => Promise.resolve([{user: {id: 1}, token: 'test token'}])
  }))
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });

  test("Login", () => {
    let log = screen.getByLabelText("loginmain");
    expect(log).toBeInTheDocument();
  });
  // test("it renders the login page", () => {
  //   const login = screen.getByLabelText("Login");
  //   expect(login).toBeTruthy();
  // });

  test("contains form", () => {
    
    let form = screen.getByRole("login-form");
    fireEvent.submit(form, {preventDefault: jest.fn(), target: {username: "test", password: "1234"}})

    expect(form).toBeInTheDocument()
  })
});
