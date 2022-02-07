import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useModal } from "react-hooks-use-modal";
import { useSelector } from "react-redux";

import { CompetitionListItem, NavBar } from "../../components";
import "./style.css";

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
      const response = await fetch(
        "https://test-django-34.herokuapp.com/competitions"
      );
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
    <>
      <NavBar />
      <h1>Public Competitions</h1>
      <button onClick={handleCreate}>Create a competition</button>

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

      {competitions.length ? (
        compList
      ) : (
        <p>
          There are no public competitions currently running, but you can still
          create one of your own!
        </p>
      )}
    </>
  );
}

export default CompetitionList;
