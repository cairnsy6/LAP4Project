import React from "react";
import { NavBar } from "../../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

function Profile() {
  const userDetails = useSelector((state) => state.currentUser);

  return (
    <div>
      <NavBar />
      <h1 className="profile-name"> Name: {userDetails.username}</h1>
      <Link to="/editprofile">
        <button>Edit Profile?</button>
      </Link>
      <h2 className="profile-name"> Current Competitions:</h2>
      <div className="competition-table">
        <h3> Competition name</h3>
        <h3> Score</h3>
      </div>
      <Link to="/create-competition">
        <button id="create">Create a competition!</button>
      </Link>
      <p id="achievements">Achievements:</p>
    </div>
  );
}

export default Profile;
