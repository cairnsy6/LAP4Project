import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

import { NavBar } from "../../components";

function CompetitionLeaderboard() {
  const [competition, setCompetition] = useState({});
  const [leaderboard, setLeaderboard] = useState();
  const [compError, setCompError] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const { id: ID } = useParams();

  const getCompetitionData = async () => {
    try {
      const response = await fetch(
        `https://test-django-34.herokuapp.com/competitions/${ID}`
      );
      if (!response.ok) {
        setCompError(true);
        return;
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log("error", error);
      setCompError(true);
    }
  };

  useEffect(async () => {
    const comp = await getCompetitionData();
    if (comp) {
      setCompetition(comp);
    }
  }, []);

  // competition_type: 1 is daily, competition_type: 2 is rolling total
  return (
    <div>
      <NavBar />
      {isLoggedIn && (
        <>
          {compError ? (
            <p>Something went wrong! Please check your url</p>
          ) : (
            <>
              <h2>{competition.name}</h2>
              <p>{competition.description}</p>
              <p>Add to your score:</p>
              {competition.competition_type === 1 && (
                <form>
                  <label htmlFor="score-update">
                    Did you achieve the goal of {competition.units} today?
                  </label>
                  <input type="checkbox" name="score-update" required />
                  <input type="submit" value="Update score" />
                </form>
              )}
              {competition.competition_type === 2 && (
                <form>
                  <label htmlFor="score-update">Add {competition.units}</label>
                  <input type="number" name="score-update" required />
                  <input type="submit" value="Update score" />
                </form>
              )}
              <h3>Leaderboard</h3>
              <ol>
                <li>Gary : 200</li>
                <li>Barry : 100</li>
                <li>Harry : 50</li>
              </ol>
            </>
          )}
        </>
      )}
      {!isLoggedIn && (
        <>
          <p>You must be logged in to view the details of competitions!</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </div>
  );
}

export default CompetitionLeaderboard;
