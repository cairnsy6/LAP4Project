import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useModal } from "react-hooks-use-modal";
import { useEffect } from "react";
import { URL } from "../../serverUrl";
import { NavBar } from "../../components";
import "./createcompetition.css";

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
      bodyObject["type_of_competition"] = 2;
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
      <form aria-label="form" onSubmit={handleFormSubmit}>
        <input type="text" name="name" id="name" placeholder="Name" required />
        <input type="textarea" name="description" id="description" placeholder="Description" required />
        <input type="date" name="end_date" id="end-date" placeholder="End Date" required />
        <div>
          <input id = "units" type="text" name="units" id="units" placeholder="Unit of Measurement" required />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16" onClick={openUnitsHelp}>
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
</svg>
        </div>

        <p id = "helpP">How would you like competitors to track their progress? <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16" onClick={openFrequencyHelp}>
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
</svg>
      </span> </p>
          <input className="form-check-input" type="radio" name="frequency" id="daily" value="1" required />
        <label htmlFor="daily">Daily</label>
        <input 
        className="form-check-input"
          type="radio"
          name="frequency"
          id="rolling-total"
          value="2"
          required
        />
        <label htmlFor="rolling-total">Rolling total</label>

        <input className="btn btn-lg btn-success createbutton" type="submit" value="Create" />
      </form>

      <UnitsHelp className="pop-up modal" >
        <p className= "modal">How are you going to measure progress on your competition?/n
        Eg. taking public transport, cups recycled, lights turned off.</p>
        <button onClick={closeUnitsHelp}>Close</button>
      </UnitsHelp>

      <FrequencyHelp className="pop-up">
        <p className= "modal">
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
