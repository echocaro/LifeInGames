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
      <div className="flex flex-row">
        <div className="w-1/2">
          <Genres />
        </div>
        <div className="w-1/2">
          <GamePlayTime />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
