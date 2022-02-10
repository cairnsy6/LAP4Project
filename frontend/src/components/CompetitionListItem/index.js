import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";

import { URL } from "../../serverUrl";
import "./style.css";

// import { useDispatch } from "react-redux";

function CompetitionListItem({ competition, openPopUp }) {
	const navigate = useNavigate();

	const isLoggedIn = useSelector(state => state.isLoggedIn);
	const userDetails = useSelector(state => state.currentUser);

	const today = new Date();
	const todayString = moment(today).format("YYYY-MM-DD");

	let dateReformatted = competition.end_date.split("-");
	dateReformatted = `${dateReformatted[2]}/${dateReformatted[1]}/${dateReformatted[0]}`;

	// const handleJoinClick = async (e) => {
	//   e.preventDefault();
	//   try {
	//     const competitionDetails = {
	//       user_id: userDetails.id,
	//       competition_id: competition.id,
	//       score: 0,
	//       last_updated: "2000-01-01",
	//     };
	//     const options = {
	//       method: "POST",
	//       headers: {
	//         "Content-type": "application/json",
	//         Authorization: `token ${localStorage.getItem("token")}`,
	//       },
	//       body: JSON.stringify(competitionDetails),
	//     };
	//     const response = await fetch(`${URL}/scores/`, options);
	//     const data = await response.json();
	//     navigate(`/competition/${competition.id}`, { replace: true });
	//   } catch (error) {
	//     console.warn(error);
	//   }
	// };

	const handleTitleClick = () => {
		isLoggedIn ? navigate(`/competition/${competition.id}`) : openPopUp();
	};

	return (
		<div role="CompetitionListItem">
			<h3 id="h3item">
				<span id="competitionTitle" onClick={handleTitleClick}>
					<span id="competitionName">{competition.name}</span>
				</span>
				<span id="competitionDate">
					{competition.end_date >= todayString ? dateReformatted : "COMPLETED"}
				</span>
			</h3>
		</div>
	);
}

export default CompetitionListItem;
