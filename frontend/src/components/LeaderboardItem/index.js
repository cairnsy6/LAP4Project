import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./leaderboarditem.css"

function LeaderboardItem({ score }) {
  const userDetails = useSelector((state) => state.currentUser);

  return (
    <li  id= "leaderboarditemli" role="LeaderboardItem" className={userDetails.id === score.user.id ? "current" : "other"}>
      {score.user.username} - {score.score}
    </li>
  );
}

export default LeaderboardItem;
