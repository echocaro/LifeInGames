import React from "react";
import Games from "./Games";
import Genres from "./Genres";
import GamePlayTime from "./GamePlayTime";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row md:h-screen w-96 md:w-full md:mt-32">
      <div className="md:w-2/3 md:flex-col">
        <Games />
        <Genres />
      </div>
      <div className="md:w-1/3">
        <GamePlayTime />
      </div>
    </div>
  );
};

export default Dashboard;
