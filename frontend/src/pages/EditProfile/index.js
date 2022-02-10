import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./editprofile.css";
import { URL } from "../../serverUrl";
import { NavBar } from "../../components";
import { login } from "../../redux/actions/action";

function EditProfile() {
	const [error, setError] = useState("");

	const isLoggedIn = useSelector(state => state.isLoggedIn);
	const userDetails = useSelector(state => state.currentUser);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFormSubmit = async e => {
		e.preventDefault();

		const form = e.target;

		if (form.password.value !== form.passwordconfirm.value) {
			setError("Please ensure your passwords match");
		} else {
			try {
				const options = {
					method: "PATCH",
					body: JSON.stringify({
						username: form.username.value,
						password: form.password.value
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `token ${localStorage.getItem("token")}`
					}
				};
				console.log(options.body);
				const response = await fetch(`${URL}/users/${userDetails.id}`, options);
				const data = await response.json();
				console.log(data);
				dispatch(login(data));
				navigate(`/profile`, { replace: true });
			} catch (error) {
				console.warn(error);
			}
		}
	};

	useEffect(() => {
		!isLoggedIn && navigate("/login");
	}, []);

	return (
		<div aria-label="EditProfile">
			<NavBar />
			<h1>Update your profile </h1>
			<form aria-label="update-profile" onSubmit={handleFormSubmit}>
				<input type="text" name="username" id="username" placeholder="Username" />
				<input type="password" name="password" id="password" placeholder="Password" />
				<input
					type="password"
					name="passwordconfirm"
					id="passwordconfirm"
					placeholder="Confirm Password"
				/>
				<button className="btn btn-lg btn-success" type="submit" value="Submit">
					Submit
				</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
}
export default EditProfile;
