import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const steamId = Cookies.get("steamdId");

  const colors = ["text-pink", "text-yellow", "text-purple"];

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
      <h2 className="text-white text-start font-light text-2xl">Top Genres</h2>
      <div className="flex flex-col bg-green">
        {genres.map((genre, index) => (
          <h3 className={`font-bold ${colors[index]} text-start`}>{genre}</h3>
        ))}
      </div>
    </div>
  );
};

export default Genres;
