import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { URL } from "../../serverUrl";
import { login } from "../../redux/actions/action";
import { NavBar } from "../../components";
import "./login.css";

function Login() {
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleFormSubmit = async e => {
		e.preventDefault();
		const form = e.target;
		try {
			const userLogin = {
				username: form.username.value,
				password: form.password.value
			};
			const options = {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(userLogin)
			};
			const response = await fetch(`${URL}/login/`, options);
			const data = await response.json();
			if (!data.token) {
				dispatch({
					type: "ERROR",
					payload: "Login not authorised"
				});
				if (data["non_field_errors"]) {
					setError("Incorrect username or password!");
				}
			} else {
				localStorage.setItem("token", data.token);
				dispatch(login(data.user));
				navigate(`/profile`, { replace: true });
			}
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<main className="loginmain" aria-label="loginmain">
			<NavBar />
			<h1 id="loginTitle">Planet Pals</h1>
			<h4 id="slogan">Saving The World, One Competition At A Time</h4>

			<div className="loginbody">
				<form role="login-form" onSubmit={handleFormSubmit}>
					<input className="loginForm" type="text" id="username" placeholder="Username" required />

					<input
						className="loginForm"
						type="password"
						id="password"
						placeholder="Password"
						required
					/>
					{error && <p className="errorText">{error}</p>}
					<button id="submit-btn" className="btn-btn-lg btn-success" type="submit" value="Submit">
						Login
					</button>
				</form>

				<p
					id="registerButton"
					className="btn btn-primary btn-lg"
					onClick={() => navigate("/register")}
				>
					Click to Register
				</p>
			</div>
		</main>
	);
}

export default Login;
