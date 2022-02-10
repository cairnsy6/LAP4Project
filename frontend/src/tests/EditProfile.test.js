/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { screen, render, fireEvent } from "@testing-library/react";
 import EditProfile from "../pages/EditProfile/index";
 import { Provider } from "react-redux";
 import { MemoryRouter } from "react-router-dom";
 import { store } from "../redux/store/store";
 
 describe("EditProfile", () => {
  const redux = require('react-redux')
  global.fetch = jest.fn(() =>
  Promise.resolve({
  json: () => Promise.resolve([{id: 1, name: "test name", description: "test desc", units: "test units", frquency:1, end_date: "2022-04-01"}])
  }))
   beforeEach(() => {
    jest.spyOn(redux, 'useSelector');
    redux.useSelector = jest.fn().mockReturnValue(true);
     render(
       <Provider store={store}>
         <EditProfile />
       </Provider>,
       { wrapper: MemoryRouter }
     );
   });
   test("it renders the editprofile page", () => {
     const ccomp = screen.getByLabelText("EditProfile");
     expect(ccomp).toBeTruthy();
   });

   test("contains form", () => {
    
    let form = screen.getByLabelText("update-profile");
    fireEvent.submit(form, {preventDefault: jest.fn(), target: {username: "test", password: "1234", passwordconfirm: "1234"}})

    expect(form).toBeInTheDocument()
  })
 });
 