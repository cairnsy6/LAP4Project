import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import moment from "moment";

import { URL } from "../../serverUrl";
import { NavBar } from "../../components";
import "./profile.css";

function Profile() {
	const [compDetails, setCompDetails] = useState();

	const isLoggedIn = useSelector(state => state.isLoggedIn);
	const userDetails = useSelector(state => state.currentUser);

	const navigate = useNavigate();

	const today = new Date();
	const todayString = moment(today).format("YYYY-MM-DD");

	const getCompetitionsAndScores = async () => {
		try {
			const options = {
				method: "POST",
				body: JSON.stringify({ user_id: userDetails.id }),
				headers: {
					"Content-type": "application/json",
					Authorization: `token ${localStorage.getItem("token")}`
				}
			};
			const response = await fetch(`${URL}/competitions/user_comps/`, options);
			const data = await response.json();
			setCompDetails(data);
		} catch (error) {
			console.warn(error);
		}
	};

	useEffect(async () => {
		!isLoggedIn && navigate("/login");
		await getCompetitionsAndScores();
	}, []);

	const competitionScores = compDetails ? (
		compDetails.map(c => {
			return (
				<div key={c.id} className="competition-table">
					<h3 onClick={() => navigate(`/competition/${c.id}`)}>{c.name}</h3>
					<h3>{c.score.score}</h3>
					{c.end_date < todayString && <p className="completed">(COMPLETED)</p>}
				</div>
			);
		})
	) : (
		<></>
	);

	return (
		<div className="profile-page" aria-label="Profile">
			<NavBar />
			<h1 id="nameTitle" className="profile-name">
				{userDetails.username}
			</h1>
			<Link to="/editprofile">
				<button className="btn btn-lg btn-warning" id="editProfileButton">
					Edit Profile
				</button>
			</Link>
			<div id="competitionInfo">
				<h2 id="currentCompsTag" className="profile-name">
					Competitions
				</h2>
				{competitionScores}
			</div>
			<Link to="/create-competition">
				<button id="create" className="btn btn-lg btn-success">
					<span>Create a competition!</span>
				</button>
			</Link>
		</div>
	);
}

export default Profile;
