import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { URL } from "../../serverUrl";
import "./style.css";

// import { useDispatch } from "react-redux";

function CompetitionListItem({ competition }) {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userDetails = useSelector((state) => state.currentUser);

  let dateReformatted = competition.end_date.split("-");
  dateReformatted = `${dateReformatted[2]}/${dateReformatted[1]}/${dateReformatted[0]}`;

  const handleJoinClick = async (e) => {
    e.preventDefault();
    try {
      const competitionDetails = {
        userId: userDetails.id,
        competitionId: competition.id,
        score: 0,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Authentication",
        },
        body: JSON.stringify(competitionDetails),
      };
      const response = await fetch(`${URL}/scores/`, options);
      const data = await response.json();
      navigate(`/competition/:id`, { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div role="CompetitionListItem">
      <ul>
        <li>
          <h3>
            <span
              id="competitionTitle"
              onClick={() => navigate(`/competition/${competition.id}`)}
            ></span>
            <span id="competitionName">{competition.name}</span>
            <span id="competitionDate">{dateReformatted}</span>
            {isLoggedIn && (
              <button aria-label="competitionButton" id="competitionButton" onClick={handleJoinClick}>
                Join
              </button>
            )}
          </h3>
        </li>
      </ul>
    </div>
  );
}

export default CompetitionListItem;
