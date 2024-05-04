import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

const Games = () => {
  const [games, setGames] = useState([]);
  const steamId = Cookies.get("steamdId");
  // const isMounted = useRef(false);

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
      <h3 className="">Your top games are </h3>
      <div className="flex flex-row flex-wrap justify-center">
        {games.map((game) => (
          <div className="m-1">
            <img
              src={game.ImageURL}
              alt=""
              className="rounded-3xl w-48 h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
