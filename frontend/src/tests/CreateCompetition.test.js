/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import CreateCompetition from "../pages/CreateCompetition/index";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store/store";

describe("CreateCompetition", () => {
  const redux = require('react-redux')
  global.fetch = jest.fn(() =>
  Promise.resolve({
  json: () => Promise.resolve([{id: 1}])
  }))
  beforeEach(() => {
    jest.spyOn(redux, 'useSelector');
    redux.useSelector = jest.fn().mockReturnValue(true);
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

  test("contains form", () => {
    
    let form = screen.getByLabelText("form");
    fireEvent.submit(form, {preventDefault: jest.fn(), target: {name: "test", description: "test desc", end_date: "2022_04_01", units: "test units", frequency: "1"}})

    expect(form).toBeInTheDocument()
  })

});
