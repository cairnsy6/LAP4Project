/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { screen, render } from "@testing-library/react";
 import LeaderboardItem from "../components/LeaderboardItem/index";
 import { Provider } from "react-redux";
 import { MemoryRouter } from "react-router-dom";
 import { store } from "../redux/store/store";
 
 describe("LeaderboardItem", () => {
    const score = {score: 1, user: {name: "test name", id: 1}}
   beforeAll(() => {
     render(
       <Provider store={store}>
         <LeaderboardItem score={score} />
       </Provider>,
       { wrapper: MemoryRouter }
     );
   });
   test("it renders the LeaderboardItem component", () => {
     const ccomp = screen.getByRole("LeaderboardItem");
     expect(ccomp).toBeInTheDocument();
   });
 });
 