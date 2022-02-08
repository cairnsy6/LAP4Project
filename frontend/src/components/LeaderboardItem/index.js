import React, { useState } from "react";
import { useSelector } from "react-redux";

function LeaderboardItem({ score }) {
  const userDetails = useSelector((state) => state.currentUser);

  return (
    <li className={userDetails.id === score.user.id ? "current" : "other"}>
      <p>{score.user.username}</p>
      <p>{score.score}</p>
    </li>
  );
}

export default LeaderboardItem;
