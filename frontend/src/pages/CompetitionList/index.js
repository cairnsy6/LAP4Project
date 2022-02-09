import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useModal } from "react-hooks-use-modal";
import { useSelector } from "react-redux";

import { URL } from "../../serverUrl";
import { CompetitionListItem, NavBar } from "../../components";
import "./competitionlist.css";

function CompetitionList() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [competitions, setCompetitions] = useState([]);
  const [ModalNotLoggedIn, openModalNotLoggedIn, closeModalNotLoggedIn] =
    useModal("root", {
      preventScroll: true,
      closeOnOverlayClick: true,
    });

  const fetchCompetitions = async () => {
    try {
      const options = {
        headers: new Headers({
          Authorization: `token ${localStorage.getItem("token")}`,
        }),
      };
      const response = await fetch(`${URL}/competitions/public`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = (e) => {
    if (isLoggedIn) {
      navigate("/create-competition");
    } else {
      openModalNotLoggedIn();
    }
  };

  useEffect(async () => {
    const comps = await fetchCompetitions();
    setCompetitions(comps);
  }, []);

  const navigate = useNavigate();

  const compList = competitions.length ? (
    competitions.map((comp) => (
      <CompetitionListItem competition={comp} key={comp.id} />
    ))
  ) : (
    <></>
  );
  return (
    <div id="competitionDiv">
      <NavBar />
      <h1 id="competitionListTitle">Competitions</h1>
      <button id="createCompButton" className= "btn btn-lg btn-success" onClick={handleCreate}>
        <span>Create a competition</span>
      </button>

      <ModalNotLoggedIn>
        <div className="pop-up">
          <h3>You must be logged in to create a competition</h3>
          <button id="pop-up-login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button id="close-pop-up-btn" onClick={closeModalNotLoggedIn}>
            Close
          </button>
        </div>
      </ModalNotLoggedIn>
      <h2 id="publicComps" aria-label="competition-list">
        Public Competitions
      </h2>
      {competitions.length ? (
        compList
      ) : (
        <p>
          There are no public competitions currently running, but you can still
          create one of your own!
        </p>
      )}
    </div>
  );
}

export default CompetitionList;
