import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../../components";
import "./about.css";
function About() {
	return (
		<div id="aboutDiv">
			<NavBar />
			<div id="innerDiv">
				<h2 id="aboutTitle" aria-label="About">
					Our Mission
				</h2>
				<p>
					Welcome to the Planet Pals! Tired of causing death and despair to our beloved planet?
					<br />
					Worried about the world you will be leaving your children?
					<br />
					Do you just need something to live for?
					<br />
					Well fear not, because we can make all your troubles (and carbon footprint) fade away!
				</p>
			</div>
		</div>
	);
}

export default About;
