import React from "react";
import Games from "./Games";
import Genres from "./Genres";
import GamePlayTime from "./GamePlayTime";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

const Dashboard = () => {
  return (
    <div className="flex flex-row h-screen justify-center items-center">
      <div className="w-2/3">
        <Games />
        <Genres />
      </div>
      <div className="w-1/3">
        <GamePlayTime />
      </div>
    </div>
  );
};

export default Dashboard;
