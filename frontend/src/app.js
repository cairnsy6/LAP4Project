import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import {
	Home,
	Login,
	Register,
	CompetitionList,
	Profile,
	About,
	CompetitionLeaderboard,
	EditProfile,
	CreateCompetition
} from "./pages";
import "./style.css";

function App() {
	const isLoggedIn = useSelector(state => state.isLoggedIn);

	return (
		<div id="rootDiv">
			<Routes>
				<Route exact path="/" element={isLoggedIn ? <Profile /> : <Login />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/competitions" element={<CompetitionList />} />
				<Route exact path="/profile" element={<Profile />} />
				<Route exact path="/about" element={<About />} />
				<Route exact path="/editprofile" element={<EditProfile />} />
				<Route exact path="/create-competition" element={<CreateCompetition />} />
				<Route path="/competition/:id" element={<CompetitionLeaderboard />} />
			</Routes>
		</div>
	);
}

export default App;
