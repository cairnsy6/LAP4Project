import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../../components";

function About() {
  return (
    <div>
      <NavBar />
      <h2>About Us</h2>
      <p>
        Hellooooo, welcome to the Planet Pals. Tired of causing death and
        despair to our beloved planet?
        <br />
        Worried about the world you will be leaving your children? <br /> Do you
        just need something to live for? <br /> Well fear not, because we can
        make all your troubles (and carbon footprint) fade away!
      </p>
    </div>
  );
}

export default About;
