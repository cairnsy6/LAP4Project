/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { default as Login } from "../pages/Login/index";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

// describe("Login", () => {
//   let mockFunction;
//   beforeEach(() => {
//     mockFunction = jest.fn();
//     render(
//       <Provider store={store}>
//         <Login />
//       </Provider>,
//       { wrapper: MemoryRouter }
//     );
//   });

//   test("Login", () => {
//     let log = screen.getByRole("loginmain");
//     expect(log).toBeInTheDocument();
//   });
// });
