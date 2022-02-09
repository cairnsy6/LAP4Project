import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useModal } from "react-hooks-use-modal";
import { useEffect } from "react";
import { URL } from "../../serverUrl";
import { NavBar } from "../../components";
import "./style.css";

function CreateCompetition() {
  const [UnitsHelp, openUnitsHelp, closeUnitsHelp] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });
  const [FrequencyHelp, openFrequencyHelp, closeFrequencyHelp] = useModal(
    "root",
    { preventScroll: true, closeOnOverlayClick: true }
  );
  const userDetails = useSelector((state) => state.currentUser);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const bodyObject = Object.fromEntries(new FormData(e.target));
      bodyObject["type_of_competition"] = 1;
      bodyObject["host_id"] = userDetails.id; // GET USER ID
      bodyObject["completed"] = "False";
      bodyObject["frequency"] = parseInt(bodyObject["frequency"]);
      const options = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        }),
        body: JSON.stringify(bodyObject),
      };
      const response = await fetch(`${URL}/competitions/`, options);
      const data = await response.json();
      console.log(data);
      // join

      const competitionDetails = {
        user_id: userDetails.id,
        competition_id: data.id,
        score: 0,
        last_updated: "2000-01-01",
      };
      const option = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(competitionDetails),
      };
      const res = await fetch(`${URL}/scores/`, option);
      const dt = await res.json();
      console.log(dt);

      navigate(`/competition/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/competitions");
    }
  }, []);

  return (
    <div id="createCompDiv">
      <NavBar />
      <h1 aria-label="CreateCompetition">Create Competition </h1>
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
        <p onClick={openUnitsHelp}>Help</p>
        <input type="text" name="units" id="units" required />

        <p>How would you like competitors to track their progress?</p>
        <p onClick={openFrequencyHelp}>Help</p>
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

      <UnitsHelp className="pop-up">
        <p>How are you going to measure progress on your competition?</p>
        <p>Eg. taking public transport, cups recycled, lights turned off.</p>
        <button onClick={closeUnitsHelp}>Close</button>
      </UnitsHelp>

      <FrequencyHelp className="pop-up">
        <p>
          Is your goal something that can be marked as achieved daily (eg.
          taking public transport to work, or bringing in your own lunch from
          home) or something that has a score that you want to be able to keep
          adding periodically (eg. turning off unused lights, or hours of
          volunteering)
        </p>
        <button onClick={closeFrequencyHelp}>Close</button>
      </FrequencyHelp>
    </div>
  );
}

export default CreateCompetition;
