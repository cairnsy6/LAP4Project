import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../../components";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: "POST",
        body: {
          username: e.target.form.username.value,
          password: e.target.form.password.value,
        },
        headers: { "Content-type": "application/json" },
      };
      const response = await fetch(
        `http://test-django-34.herokuapp.com/users`,
        options
      );
      const data = await response.json();
      // (do I need to convert it to json?)
      navigate(`/profile`, { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div id="loginDiv">
      <NavBar />
      <form onSubmit={handleFormSubmit}>
        <h2>Loginnnnnnnnn</h2>
        <label for="username">Username</label>
        <input type="text" id="username" />
        <label for="password">Password</label>
        <input type="text" id="password" />
        <input type="submit" value="Submit" />
      </form>
      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
}

export default Login;
