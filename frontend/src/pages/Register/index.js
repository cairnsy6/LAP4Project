import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestLogin, logout, login } from "../../redux/actions/action";

import { NavBar } from "../../components";
import { URL } from "../../serverUrl";
import "./style.css";

function Register() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.passwordconfirm.value) {
      setError("Please ensure your passwords match");
    } else {
      try {
        const userData = {
          username: e.target.username.value,
          password: e.target.password.value,
          email: e.target.email.value,
        };
        // console.log(user);
        const options = {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(userData),
        };

        const response = await fetch(`${URL}/register/`, options);
        const data = await response.json();
        console.log("data from register", data);

        // if (data.err) {
        //   throw Error(data.err);
        // }

        if (!data.token) {
          dispatch({
            type: "ERROR",
            payload: "Login not authorised",
          });
          console.log("there was an error");
        } else {
          localStorage.setItem("token", data.token);
          dispatch(login(data.user));
        }

        navigate(`/profile`, { replace: true });
      } catch (error) {
        console.warn(error);
      }
    }
  };
  return (
    <div className="registerDiv">
      <NavBar />
      <h1 id="registerTitle">Planet Pals</h1>
      <div>Slogan</div>
      <h2>Register</h2>
      <form onSubmit={handleFormSubmit} aria-label="register-form">
        <label htmlFor="username">Name</label>
        <input type="username" name="username" id="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="passwordconfirm">Confirm password</label>
        <input type="password" name="passwordconfirm" id="passwordconfirm" />

        {error && <p>{error}</p>}

        <input
          id="regbutton"
          className="btn-success btn btn-lg"
          type="submit"
          value="Register"
          aria-label="register-button"
        />
      </form>
      <p onClick={() => navigate("/login")}>
        Already have an account? Click here to login
      </p>
    </div>
  );
}

export default Register;
