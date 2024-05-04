import React from "react";
import Games from "./Games";
import Genres from "./Genres";
import GamePlayTime from "./GamePlayTime";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

const Dashboard = () => {
  return (
    <div>
      <Games />
      <Genres />
      <GamePlayTime />
    </div>
  );
};

export default Dashboard;
