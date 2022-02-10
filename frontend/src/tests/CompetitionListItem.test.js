/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { screen, render, fireEvent } from "@testing-library/react";
 import CompetitionListItem from "../components/CompetitionListItem/index";
 import { Provider } from "react-redux";
 import { MemoryRouter } from "react-router-dom";
 import { store } from "../redux/store/store";
 
 describe("CompetitionListItem", () => {
    const redux = require('react-redux')
    const competition = {id: 1, name: "test comp", end_date: "2022-04-01"}
    global.fetch = jest.fn(() =>
    Promise.resolve({
    json: () => Promise.resolve([{id: 1, name: "test name", description: "test desc", units: "test units", frquency:1, end_date: "2022-04-01"}])
    }))
   beforeEach(() => {
    jest.spyOn(redux, 'useSelector');
    redux.useSelector = jest.fn().mockReturnValue(true);
     render(
       <Provider store={store}>
         <CompetitionListItem competition={competition} />
       </Provider>,
       { wrapper: MemoryRouter }
     );
   });
   test("it renders the CompetitionListItem component", () => {
     const ccomp = screen.getByRole("CompetitionListItem");
     expect(ccomp).toBeInTheDocument();
   });

   test("contains ", () => {
    let joinBtn = screen.getByLabelText("competitionButton");
    fireEvent.click(joinBtn, {preventDefault: jest.fn()})

    expect(joinBtn).toBeInTheDocument()
  })

  
 });
 