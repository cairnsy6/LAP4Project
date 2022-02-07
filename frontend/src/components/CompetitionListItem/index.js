import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function CompetitionListItem({ competition }) {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  let dateReformatted = competition.end_date.split("-");
  dateReformatted = `${dateReformatted[2]}/${dateReformatted[1]}/${dateReformatted[0]}`;

  return (
    <div>
      <h3 onClick={() => navigate(`/competition/${competition.id}`)}>
        {competition.name}
      </h3>
      <p>Competition ending on {dateReformatted}</p>
      {isLoggedIn && <button>Join</button>}
    </div>
  );
}

export default CompetitionListItem;
