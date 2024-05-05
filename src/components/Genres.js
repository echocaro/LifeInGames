import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const steamId = Cookies.get("steamdId");
  const colors = ["bg-pink", "bg-yellow", "bg-purple", "bg-green", "bg-orange"];

  useEffect(() => {
    const fetchToken = async () => {
      if (!steamId) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/${steamId}/top-genres`,
          {
            steamId: steamId,
          }
        );
        setGenres(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchToken();
  }, [steamId]);

  return (
    <div className="flex flex-col">
      <h2 className="text-white text-start font-light text-2xl mb-1">
        Top Genres
      </h2>
      <div className="flex flex-row">
        {genres.map((genre, index) => (
          <div
            className={`${colors[index]} pt-2 pb-2 pl-3 pr-3 rounded-2xl mr-1`}
          >
            <h3 className="font-bold">{genre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
