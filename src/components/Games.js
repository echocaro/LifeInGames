import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Games = () => {
  const [games, setGames] = useState([]);
  const steamId = Cookies.get("steamdId");

  useEffect(() => {
    const fetchGames = async () => {
      if (!steamId) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/${steamId}/top-games`,
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
      <h3 className="text-white text-start font-light text-2xl sm:mp-50">
        Top Games
      </h3>
      <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap">
        {games.map((game) => (
          <div className="m-1 md:w-56 ml:w-56 w-80">
            <img src={game.ImageURL} alt="" className="rounded-3xl " />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
