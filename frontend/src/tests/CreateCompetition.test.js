/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import CreateCompetition from "../pages/CreateCompetition/index";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store/store";

describe("CreateCompetition", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <CreateCompetition />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });
  test("it renders the createcompetition page", () => {
    const ccomp = screen.getByLabelText("CreateCompetition");
    expect(ccomp).toBeTruthy();
  });
});
