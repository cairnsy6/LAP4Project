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
		last_updated: ""
	});
	const [completed, setCompleted] = useState(false);
	const [isUserInCompetition, setIsUserInCompetition] = useState(false);
	const [totalInput, setTotalInput] = useState("");
	const [showManage, setShowManage] = useState(false);
	const [userToDeleteDetails, setUserToDeleteDetails] = useState();
	const [isUserHost, setIsUserHost] = useState(false);
	const [isUserRemoved, setIsUserRemoved] = useState(false);

	const [LeaveCompetitionWarning, openLeaveCompetitionWarning, closeLeaveCompetitionWarning] =
		useModal("root", {
			preventScroll: true,
			closeOnOverlayClick: true
		});
	const [RemoveUserWarning, openRemoveUserWarning, closeRemoveUserWarning] = useModal("root", {
		preventScroll: true,
		closeOnOverlayClick: true
	});
	const [DeleteCompetitionWarning, openDeleteCompetitionWarning, closeDeleteCompetitionWarning] =
		useModal("root", {
			preventScroll: true,
			closeOnOverlayClick: true
		});

	const navigate = useNavigate();

	const isLoggedIn = useSelector(state => state.isLoggedIn);
	const userDetails = useSelector(state => state.currentUser);

	const { id: ID } = useParams();
	const today = new Date();
	const todayString = moment(today).format("YYYY-MM-DD");

	const getCompetitionData = async () => {
		//will get all competition data and leaderboard
		try {
			const options = {
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: `token ${localStorage.getItem("token")}`
				})
			};
			const response = await fetch(`${URL}/competitions/${ID}/get_leaderboard`, options);

			if (!response.ok) {
				setCompError(true);
				return;
			} else {
				const data = await response.json();
				console.log(data);
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
				Authorization: `token ${localStorage.getItem("token")}`
			}),
			body: JSON.stringify({ score: score, last_updated: todayString })
		};
		const response = await fetch(`${URL}/scores/${id}/`, options);
		const data = await response.json();
		console.log(data);
		setUserScoreObject(data);
		return data;
	};

	const handleDailyUpdate = async e => {
		e.preventDefault();
		await updateScore(userScoreObject.score + 1, userScoreObject.id);
	};

	const handleTotallingUpdate = async e => {
		e.preventDefault();
		const newScore = parseInt(e.target["score-update"].value);
		await updateScore(userScoreObject.score + newScore, userScoreObject.id);
		setTotalInput("");
	};

	const handleTotalInput = e => {
		setTotalInput(e.target.value);
	};

	const removeUserFromCompetition = async scoreObject => {
		try {
			const options = {
				method: "DELETE",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: `token ${localStorage.getItem("token")}`
				})
			};
			await fetch(`${URL}/scores/${scoreObject.id}`, options);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUserLeavingComp = async user => {
		await removeUserFromCompetition(user);
		if (user.id === userDetails.id) {
			setIsUserInCompetition(false);
			setUserScoreObject({ score: 0, last_updated: "" });
		} else {
			setUserScoreObject(userScoreObject);
			setIsUserRemoved(!isUserRemoved);
		}
	};

	const handleJoinClick = async e => {
		e.preventDefault();
		try {
			const competitionDetails = {
				user_id: userDetails.id,
				competition_id: leaderboard.id,
				score: 0,
				last_updated: "2000-01-01"
			};
			const options = {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `token ${localStorage.getItem("token")}`
				},
				body: JSON.stringify(competitionDetails)
			};
			const response = await fetch(`${URL}/scores/`, options);
			const data = await response.json();
			setIsUserInCompetition(true);
			setUserScoreObject(data);
		} catch (error) {
			console.warn(error);
		}
	};

	const leaderboardDisplay = isLeaderboard
		? leaderboard.scores.map(score => <LeaderboardItem score={score} key={score.id} />)
		: [];

	const manage = leaderboard.scores.length ? (
		leaderboard.scores.map(u => {
			if (u.user.id !== userDetails.id) {
				return (
					<div className="manageParticipants" key={u.id}>
						<div className="removeParticipant">
							<p class="removeParticipantUsername">{u.user.username}</p>
							<button
								className="btn btn-lg btn-success removeParticipantButton"
								onClick={() => {
									setUserToDeleteDetails(u);
									openRemoveUserWarning();
								}}
							>
								X
							</button>
						</div>
					</div>
				);
			}
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
					Authorization: `token ${localStorage.getItem("token")}`
				}
			};
			const res = await fetch(`${URL}/competitions/${ID}`, options);
			navigate(`/profile`);
		} catch (error) {
			console.warn(error);
		}
	};

	useEffect(async () => {
		const comp = await getCompetitionData();
		setLeaderboard(comp);
	}, [userScoreObject, isUserRemoved]);

	useEffect(async () => {
		!isLoggedIn && navigate("/login");

		const lboard = await getCompetitionData();
		if (lboard) {
			setLeaderboard(lboard);
			userDetails.id === lboard.host_id && setIsUserHost(true);
			lboard.scores.length > 0 && setIsLeaderboard(true);
			lboard.end_date < todayString && setCompleted(true);

			const userScore = lboard.scores.filter(score => score.user_id === userDetails.id);
			if (userScore.length) {
				setIsUserInCompetition(true);
				setUserScoreObject(userScore[0]);
			}
		}
	}, []);

	return (
		<div id="competitionLeaderboardDiv" aria-label="leaderboard">
			<NavBar />
			{isLoggedIn && (
				<>
					{compError ? (
						<p>Something went wrong! Please check your url</p>
					) : (
						<>
							<h2 id="leaderboardnameh2">{leaderboard.name}</h2>
							<p id="leaderboarddescriptionp">{leaderboard.description}</p>

							{!completed ? (
								<>
									{isUserInCompetition ? (
										<>
											{leaderboard.frequency === "1" && (
												<>
													{userScoreObject.last_updated === todayString ? (
														<p>Well done for {leaderboard.units} today!</p>
													) : (
														<>
															<form aria-label="update-score" onSubmit={handleDailyUpdate}>
																<label htmlFor="score-update">
																	Did you achieve the goal of <br></br>
																	{leaderboard.units} today?
																</label>
																<input
																	id="score-update"
																	className="form-check-input"
																	type="checkbox"
																	name="score-update"
																	required
																/>
																<input
																	id="updateScoreCompetition"
																	className="btn btn-lg btn-success"
																	type="submit"
																	value="Update score"
																/>
															</form>
														</>
													)}
												</>
											)}
											{leaderboard.frequency === "2" && (
												<>
													<form onSubmit={handleTotallingUpdate}>
														<label htmlFor="score-update">Add {leaderboard.units}</label>
														<input
															id="score-update-box"
															className="form-check-input"
															type="number"
															name="score-update"
															required
															value={totalInput}
															onChange={handleTotalInput}
														/>
														<input
															id="updateScoreCompetition"
															className="btn btn-lg btn-success"
															type="submit"
															value="Update score"
														/>
													</form>
												</>
											)}
											<div className="leaderboardItemTable">
												<h3 id="leaderboardTitleText">Leaderboard</h3>
												{isLeaderboard ? (
													<ol>{leaderboardDisplay}</ol>
												) : (
													<p>No scores to display</p>
												)}
											</div>
											{!isUserHost && (
												<button
													className="btn btn-lg btn-danger leaveCompButton"
													onClick={openLeaveCompetitionWarning}
												>
													Leave competition
												</button>
											)}
										</>
									) : (
										<button onClick={handleJoinClick}>Join competition</button>
									)}
								</>
							) : (
								<p>This competition is completed!</p>
							)}
							<p className="linkText">
								Share the link to invite others<br></br> to this competition!
							</p>

							<button
								className="btn btn-lg btn-success copyLinkButton"
								onClick={() => {
									navigator.clipboard.writeText(window.location.href);
								}}
							>
								Copy Link
							</button>
						</>
					)}
				</>
			)}
			{isUserHost && (
				<div className="hostButtons">
					<button
						className="btn btn-lg btn-primary manageCompButton"
						onClick={() => {
							setShowManage(!showManage);
						}}
					>
						Manage participants
					</button>
					<button
						className="btn btn-lg btn-danger deleteCompButton"
						onClick={() => openDeleteCompetitionWarning()}
					>
						Delete Competition
					</button>
					{showManage && manage}
				</div>
			)}

			<DeleteCompetitionWarning>
				<div className="modalP">
					<p>Are you sure you want to delete this competition?</p>
					<button className="modalButton" onClick={closeDeleteCompetitionWarning}>
						Cancel
					</button>
					<button
						className="modalButton"
						onClick={() => {
							closeDeleteCompetitionWarning();
							handleDeleteCompetition();
						}}
					>
						Delete
					</button>
				</div>
			</DeleteCompetitionWarning>

			<LeaveCompetitionWarning>
				<div className="modalP">
					<p>Are you sure you want to leave the competition?</p>
					<button className="modalButton" onClick={closeLeaveCompetitionWarning}>
						Cancel
					</button>
					<button
						className="modalButton"
						onClick={() => {
							closeLeaveCompetitionWarning();
							handleUserLeavingComp(userScoreObject);
						}}
					>
						Leave
					</button>
				</div>
			</LeaveCompetitionWarning>
			{userToDeleteDetails && (
				<RemoveUserWarning>
					<div className="modalP">
						<p>Are you sure you want to remove {userToDeleteDetails.user.username}?</p>
						<button className="modalButton" onClick={closeRemoveUserWarning}>
							Cancel
						</button>
						<button
							className="modalButton"
							onClick={() => {
								closeRemoveUserWarning();
								handleUserLeavingComp(userToDeleteDetails);
							}}
						>
							Remove
						</button>
					</div>
				</RemoveUserWarning>
			)}
			{!isLoggedIn && (
				<div className="modalP">
					<p>You must be logged in to view the details of competitions!</p>
					<button className="modalButton" onClick={() => navigate("/login")}>
						Login
					</button>
				</div>
			)}
		</div>
	);
}

export default CompetitionLeaderboard;
