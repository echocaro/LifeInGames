import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const GamePlayTime = () => {
  const [games, setGames] = useState([]);
  const steamId = Cookies.get("steamdId");

  useEffect(() => {
    const fetchGames = async () => {
      if (!steamId) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/${steamId}/games-data`,
          {
            steamId: steamId,
          }
        );
        setGames(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGames();
  }, [steamId]);

  return (
    <div>
      <h2 className="text-start text-white font-light text-3xl">
        Days well spent
      </h2>
      <div className="flex flex-row">
        {games.map((game) => (
          <div className="flex flex-col w-48 h-4/6 bg-blue m-1 p-4 rounded-2xl">
            <h2 className="font-bold">{game.name}</h2>
            <h3>{game.Message}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePlayTime;
