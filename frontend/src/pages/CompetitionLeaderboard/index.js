import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";
import { useModal } from "react-hooks-use-modal";

import "./competitionleaderboard.css";
import { NavBar, LeaderboardItem } from "../../components";
import { URL } from "../../serverUrl";

function CompetitionLeaderboard() {
  const [leaderboard, setLeaderboard] = useState({ scores: [] });
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const [compError, setCompError] = useState(false);
  const [userScoreObject, setUserScoreObject] = useState({
    score: 0,
    last_updated: "",
  });
  const [isUserInCompetition, setIsUserInCompetition] = useState(false);
  const [totalInput, setTotalInput] = useState("");
  const [showManage, setShowManage] = useState(false);
  const [userToDeleteDetails, setUserToDeleteDetails] = useState();
  const [isUserHost, setIsUserHost] = useState(false);

  const [
    LeaveCompetitionWarning,
    openLeaveCompetitionWarning,
    closeLeaveCompetitionWarning,
  ] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });
  const [RemoveUserWarning, openRemoveUserWarning, closeRemoveUserWarning] =
    useModal("root", {
      preventScroll: true,
      closeOnOverlayClick: true,
    });
  const [
    DeleteCompetitionWarning,
    openDeleteCompetitionWarning,
    closeDeleteCompetitionWarning,
  ] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userDetails = useSelector((state) => state.currentUser);

  const { id: ID } = useParams();
  const today = new Date();
  const todayString = moment(today).format("YYYY-MM-DD");

  const getCompetitionData = async () => {
    //will get all competition data and leaderboard
    try {
      const options = {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        }),
      };
      const response = await fetch(
        `${URL}/competitions/${ID}/get_leaderboard`,
        options
      );

      if (!response.ok) {
        setCompError(true);
        return;
      } else {
        const data = await response.json();

        userDetails.id === data.host_id && setIsUserHost(true);
        return data;
      }
    } catch (error) {
      console.log("error", error);
      setCompError(true);
    }
  };

  const updateScore = async (score, id) => {
    const options = {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      }),
      body: JSON.stringify({ score: score, last_updated: todayString }),
    };
    const response = await fetch(`${URL}/scores/${id}/`, options);
    const data = await response.json();
    console.log(data);
    setUserScoreObject(data);
    return data;
  };

  const handleDailyUpdate = async (e) => {
    e.preventDefault();
    await updateScore(userScoreObject.score + 1, userScoreObject.id);
  };

  const handleTotallingUpdate = async (e) => {
    e.preventDefault();
    const newScore = parseInt(e.target["score-update"].value);
    await updateScore(userScoreObject.score + newScore, userScoreObject.id);
    setTotalInput("");
  };

  const handleTotalInput = (e) => {
    setTotalInput(e.target.value);
  };

  const removeUserFromCompetition = async (scoreObject) => {
    try {
      const options = {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        }),
      };
      await fetch(`${URL}/scores/${scoreObject.id}`, options);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserLeavingComp = async () => {
    await removeUserFromCompetition(userScoreObject);
    setIsUserInCompetition(false);
    setUserScoreObject({ score: 0, last_updated: "" });
  };

  useEffect(async () => {
    const comp = await getCompetitionData();
    setLeaderboard(comp);
  }, [userScoreObject]);

  useEffect(async () => {
    const lboard = await getCompetitionData();
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
        user_id: userDetails.id,
        competition_id: leaderboard.id,
        score: 0,
        last_updated: "2000-01-01",
      };
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(competitionDetails),
      };
      const response = await fetch(`${URL}/scores/`, options);
      const data = await response.json();
      setIsUserInCompetition(true);
      setUserScoreObject(data);
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  let manage = leaderboard.scores.length ? (
    leaderboard.scores.map((u) => {
      return (
        <div key={u.id}>
          <p>{u.user.username}</p>
          <button
            onClick={() => {
              openRemoveUserWarning();
              setUserToDeleteDetails(u);
            }}
          >
            Remove participant
          </button>
        </div>
      );
    })
  ) : (
    <></>
  );

  const handleDeleteCompetition = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch(`${URL}/competitions/${ID}`, options);
      console.log(res);
      // const dta = await res.json();
      // console.log(dta);
      navigate(`/profile`);
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
                              Did you achieve the goal of {leaderboard.units}
                              today?
                            </label>
                            <input
                              id="score-update"
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
                        <input
                          type="number"
                          name="score-update"
                          required
                          value={totalInput}
                          onChange={handleTotalInput}
                        />
                        <input type="submit" value="Update score" />
                      </form>
                    </>
                  )}
                  <button onClick={openLeaveCompetitionWarning}>
                    Leave competition
                  </button>
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
      {isUserHost && (
        <div>
          <button
            onClick={() => {
              setShowManage(!showManage);
            }}
          >
            Manage participants
          </button>
          <div>{showManage && manage}</div>
          <button onClick={() => openDeleteCompetitionWarning()}>
            Delete Competition
          </button>
        </div>
      )}
      <DeleteCompetitionWarning>
        <p>Are you sure you want to delete this competition?</p>
        <button onClick={closeDeleteCompetitionWarning}>Cancel</button>
        <button
          onClick={() => {
            closeDeleteCompetitionWarning();
            handleDeleteCompetition();
          }}
        >
          Delete
        </button>
      </DeleteCompetitionWarning>

      {/* Bethan */}

      <LeaveCompetitionWarning>
        <p>Are you sure you want to leave the competition?</p>
        <button onClick={closeLeaveCompetitionWarning}>Cancel</button>
        <button
          onClick={() => {
            closeLeaveCompetitionWarning();
            handleUserLeavingComp(userScoreObject);
          }}
        >
          Leave
        </button>
      </LeaveCompetitionWarning>
      {userToDeleteDetails && (
        <RemoveUserWarning>
          <p>
            Are you sure you want to remove {userToDeleteDetails.user.username}?
          </p>
          <button onClick={closeRemoveUserWarning}>Cancel</button>
          <button
            onClick={() => {
              closeRemoveUserWarning();
              handleUserLeavingComp(userToDeleteDetails);
            }}
          >
            Remove
          </button>
        </RemoveUserWarning>
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
