import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { NavBar } from "../../components";
import "./style.css";

function CreateCompetition() {
  const userDetails = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const bodyObject = Object.fromEntries(new FormData(e.target));
      bodyObject["type_of_competition"] = 1;
      bodyObject["host_id"] = 3; // GET USER ID
      bodyObject["completed"] = "False";
      bodyObject["frequency"] = parseInt(bodyObject["frequency"]);
      const options = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(bodyObject),
      };
      const response = await fetch(
        "https://test-django-34.herokuapp.com/competitions/",
        options
      );
      const data = await response.json();
      navigate(`/competition/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <h1>Create Competition </h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Competition Name</label>
        <input type="text" name="name" id="name" required />
        <label htmlFor="description">Description</label>
        <input type="textarea" name="description" id="description" required />
        <label htmlFor="end-date">End Date</label>
        <input type="date" name="end_date" id="end-date" required />
        <label htmlFor="units">
          What is your competition goal measured in?
        </label>
        <input type="text" name="units" id="units" required />

        <p>How would you like competitors to track their progress?</p>
        <label htmlFor="daily">Daily</label>
        <input type="radio" name="frequency" id="daily" value="1" required />
        <label htmlFor="rolling-total">Rolling total</label>
        <input
          type="radio"
          name="frequency"
          id="rolling-total"
          value="2"
          required
        />

        <input type="submit" value="Create" />
      </form>
    </>
  );
}

export default CreateCompetition;
