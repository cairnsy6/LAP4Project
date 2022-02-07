import React from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../../components";
import "./style.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="homeDiv">
      <NavBar />

      <h1 id="homeTitle">Planet Pals</h1>
      <div>Slogan</div>
      <button id="login-btn" onClick={() => navigate("/login")}>
        Login
      </button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}

export default Home;
