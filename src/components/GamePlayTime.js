import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const GamePlayTime = () => {
  const [games, setGames] = useState([]);
  const steamId = Cookies.get("steamdId");
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
    <div className="-ml-20 md:-mt-28">
      <h2 className="text-start text-white font-light text-2xl">Days Played</h2>
      <div className="flex flex-row flex-wrap">
        {games.map((game, index) => (
          <div
            className={`flex flex-col flex-wrap w-64 h-4/6 m-1 p-4 rounded-2xl ${colors[index]}`}
          >
            <h2 className="font-bold">{game.name}</h2>
            <h3>{game.Message}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePlayTime;
