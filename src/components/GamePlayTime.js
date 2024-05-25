import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const GamePlayTime = () => {
  const [games, setGames] = useState([]);
  const steamId = Cookies.get("steamId");
  const colors = ["bg-pink", "bg-yellow", "bg-purple"];

  const PROD_URL = process.env.REACT_APP_PROD_URL;
  const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

  useEffect(() => {
    const fetchGames = async () => {
      if (!steamId) {
        return;
      }
      try {
        const url =
          process.env.REACT_APP_IS_PROD === "false"
            ? `http://${LOCAL_URL}/${steamId}/games-data`
            : `https://${PROD_URL}/${steamId}/games-data`;

        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setGames(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGames();
  }, [steamId]);

  return (
    <div className="flex flex-col">
      <h3 className="text-white text-start font-light text-2xl sm:mp-50">
        Days Played
      </h3>
      <div className="flex flex-col w-auto md:flex-row md:flex-wrap">
        {games.map((game, index) => (
          <div className={`m-1 p-4 rounded-2xl ${colors[index]}`}>
            <h2 className="font-bold">{game.name}</h2>
            <h3 className="">{game.Message}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePlayTime;
