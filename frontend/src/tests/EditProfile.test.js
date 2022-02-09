/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { screen, render } from "@testing-library/react";
 import EditProfile from "../pages/EditProfile/index";
 import { Provider } from "react-redux";
 import { MemoryRouter } from "react-router-dom";
 import { store } from "../redux/store/store";
 
 describe("EditProfile", () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({
  json: () => Promise.resolve([{id: 1, name: "test name", description: "test desc", units: "test units", frquency:1, end_date: "2022-04-01"}])
  }))
   beforeAll(() => {
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
    fireEvent.submit(form, {preventDefault: jest.fn(), target: {username: "test", password: "1234", confirmpassword: "1234"}})

    expect(form).toBeInTheDocument()
  })
 });
 