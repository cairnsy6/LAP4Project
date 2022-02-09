import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";
import "./style.css";
import { NavBar, LeaderboardItem } from "../../components";
import { URL } from "../../serverUrl";

function CompetitionLeaderboard() {
  const [competition, setCompetition] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const [compError, setCompError] = useState(false);
  const [userScoreObject, setUserScoreObject] = useState({
    score: 0,
    last_updated: "",
  });
  const [isUserInCompetition, setIsUserInCompetition] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userDetails = useSelector((state) => state.currentUser);

  const { id: ID } = useParams();
  const today = new Date();
  const todayString = moment(today).format("YYYY-MM-DD");

  const getCompetitionData = async () => {
    //will get all competition data and leaderboard
    try {
      const response = await fetch(`${URL}/competitions/${ID}/get_leaderboard`);
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

  const getLeaderboard = async () => {
    //temporary route until leaderboard route is updated to be a get
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ competition_id: ID }),
      };
      const response = await fetch(
        `${URL}competitions/get_leaderboard/`,
        options
      );
      if (!response.ok) {
        setCompError(true);
        return;
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
      setCompError(true);
    }
  };

  const updateScore = async (score, id) => {
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: score }),
    };
    const response = await fetch(`${URL}scores/${id}/`, options);
    const data = await response.json();
    console.log(data);
    setUserScoreObject(data);
    return data;
  };

  const handleDailyUpdate = async (e) => {
    e.preventDefault();
    await updateScore(userScoreObject.score + 1, userScore[0].id);
  };

  const handleTotallingUpdate = async (e) => {
    e.preventDefault();
    const newScore = e.target["score-update"].value;
    await updateScore(userScoreObject.score + newScore, userScore[0].id);
  };

  useEffect(async () => {
    // const comp = await getCompetitionData();
    const lboard = await getLeaderboard();
    //   setCompetition(comp);
    setLeaderboard(lboard);
  }, [userScoreObject]);

  useEffect(async () => {
    const lboard = await getLeaderboard();
    if (lboard) {
      setLeaderboard(lboard);
      if (lboard.scores.length) {
        setIsLeaderboard(true);
      }
      const userScore = lboard.scores.filter(
        (score) => score.user_id === userDetails.id
      );
      if (userScore.length) {
        setIsUserInCompetition(true);
        setUserScoreObject(userScore[0]);
      }
    }
  }, []);

  const leaderboardDisplay = isLeaderboard
    ? leaderboard.scores.map((score) => (
        <LeaderboardItem score={score} key={score.id} />
      ))
    : [];

  // competition_type: 1 is daily, competition_type: 2 is rolling total

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
      const response = await fetch(`${URL}scores/`, options);
      const data = await response.json();
      navigate(`/competition/:id`, { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <div id="competitionLeaderboardDiv" aria-label="leaderboard">
      <NavBar />
      {isLoggedIn && (
        <>
          {compError ? (
            <p>Something went wrong! Please check your url</p>
          ) : (
            <>
              <h2>{leaderboard.name}</h2>
              <p>{leaderboard.description}</p>

              {isUserInCompetition ? (
                <>
                  {leaderboard.frequency === "1" && (
                    <>
                      {userScoreObject.last_updated === todayString ? (
                        <p>Well done for {leaderboard.units} today!</p>
                      ) : (
                        <>
                          <p>Add to your score:</p>
                          <form onSubmit={handleDailyUpdate}>
                            <label htmlFor="score-update">
                              Did you achieve the goal of {leaderboard.units}{" "}
                              today?
                            </label>
                            <input
                              type="checkbox"
                              name="score-update"
                              required
                            />
                            <input type="submit" value="Update score" />
                          </form>
                        </>
                      )}
                    </>
                  )}
                  {leaderboard.frequency === "2" && (
                    <>
                      <p>Add to your score:</p>
                      <form onSubmit={handleTotallingUpdate}>
                        <label htmlFor="score-update">
                          Add {leaderboard.units}
                        </label>
                        <input type="number" name="score-update" required />
                        <input type="submit" value="Update score" />
                      </form>
                    </>
                  )}
                </>
              ) : (
                <button onClick={handleJoinClick}>Join competition</button>
              )}
              <h3>Leaderboard</h3>
              {isLeaderboard ? (
                <ol>{leaderboardDisplay}</ol>
              ) : (
                <p>No scores to display</p>
              )}
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
