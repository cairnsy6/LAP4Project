import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { URL } from "../../serverUrl";
import { NavBar } from "../../components";
import "./style.css";

function Profile() {
  const userDetails = useSelector((state) => state.currentUser);
  const [compDetails, setCompDetails] = useState();

  const navigate = useNavigate();

  const getCompetitionsAndScores = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ user_id: userDetails.id }),
        headers: {
          "Content-type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      };
      // console.log(localStorage.getItem("token"));
      const response = await fetch(`${URL}/competitions/user_comps/`, options);
      const data = await response.json();
      console.log(data);
      setCompDetails(data);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(async () => {
    await getCompetitionsAndScores();
    console.log(compDetails);
  }, []);

  const competitionsScores = compDetails ? (
    compDetails.map((c) => {
      return (
        <div key={c.id}>
          <p onClick={() => navigate(`/competition/${c.id}`)}>{c.name}</p>
          <p>{c.score.score}</p>
        </div>
      );
    })
  ) : (
    <></>
  );
  return (
    <main>
      <div className="profile-page" aria-label="Profile">
        <NavBar />
        <h1 id="nameTitle" className="profile-name">
          Name: {userDetails.username}
        </h1>
        <Link to="/editprofile">
          <button className="btn btn-lg btn-warning" id="editProfileButton">
            Edit Profile
          </button>
        </Link>
      </div>
      <div id="competitionInfo">
        <h2 id="currentCompsTag" className="profile-name">
          Competitions {compDetails}
        </h2>
        <div className="competition-table">
          <h3> Futureproof</h3>
          <h3> 10</h3>
        </div>
        <div className="competition-table">
          <h3> Futureproof</h3>
          <h3> 10</h3>
        </div>
        <div className="competition-table">
          <h3> Futureproof</h3>
          <h3> 10</h3>
        </div>
        <div className="competition-table">
          <h3> Futureproof</h3>
          <h3> 10</h3>
        </div>
        <div className="competition-table">
          <h3> Futureproof</h3>
          <h3> 10</h3>
        </div>
        <div className="competition-table">
          <h3> Futureproof</h3>
          <h3> 10</h3>
        </div>
      </div>
      <Link to="/create-competition">
        <button id="create" className="btn btn-lg btn-success">
          <span>Create a competition!</span>
        </button>
      </Link>
    </main>
  );
}

export default Profile;
