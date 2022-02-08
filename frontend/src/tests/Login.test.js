/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../pages";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

describe("Login", () => {
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
});
