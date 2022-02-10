import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { URL } from "../../serverUrl";
import { login, requestLogin } from "../../redux/actions/action";
import { NavBar } from "../../components";
import "./login.css";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const options = {
  //       method: "POST",
  //       body: {
  //         username: e.target.form.username.value,
  //         password: e.target.form.password.value,
  //       },
  //       headers: { "Content-type": "application/json" },
  //     };
  //     const response = await fetch(
  //       `http://test-django-43.herokuapp.com/login`,
  //       options
  //     );
  //     const data = await response.json();
  //     // (do I need to convert it to json?)
  //     navigate(`/profile`, { replace: true });
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const userLogin = {
        username: form.username.value,
        password: form.password.value,
      };
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userLogin),
      };
      const response = await fetch(`${URL}/login/`, options);
      const data = await response.json();
      console.log("login data", data);
      // dispatch(requestLogin(userLogin));
      if (!data.token) {
        dispatch({
          type: "ERROR",
          payload: "Login not authorised",
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
      <div className="loginbody">
        <form role="login-form" onSubmit={handleFormSubmit}>
          <h2 id="loginTitle">Login</h2>

          <input
            className="loginForm"
            type="text"
            id="username"
            placeholder="Username"
            required
          />

          <input
            className="loginForm"
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <button
            id="submit-btn"
            className="btn-btn-lg btn-success"
            type="submit"
            value="Submit"
          >
            Login
          </button>
        </form>
        <p>{error}</p>
        <p>
          Don't have an account?
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </main>
  );
}

export default Login;
