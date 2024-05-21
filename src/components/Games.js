import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Games = () => {
  const [games, setGames] = useState([]);
  const steamId = Cookies.get("steamdId");

  const PROD_URL = process.env.REACT_APP_PROD_URL;
  const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;
  useEffect(() => {
    const fetchGames = async () => {
      if (!steamId) {
        return;
      }
      try {
        console.log("what is this: ", process.env.REACT_APP_IS_PROD);
        const url =
          process.env.REACT_APP_IS_PROD === "false"
            ? `http://${LOCAL_URL}/${steamId}/top-games`
            : `https://${PROD_URL}/${steamId}/top-games`;
        const response = await axios.get(url, {
          steamId: steamId,
        });
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
