import React from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../../components";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="homeDiv" aria-label="Home">
        <h1 id="homeTitle">Planet Pals</h1>
        <div>Slogan</div>

        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          id="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <br />
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          id="register-btn"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </>
  );
}

export default Home;
