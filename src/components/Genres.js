import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const steamId = Cookies.get("steamdId");
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
      <h2 className="text-white text-start font-light text-2xl">
        These are some of your top played genres
      </h2>
      <div className="flex flex-row">
        {genres.map((genre) => (
          <div className="bg-pink m-1 p-10 rounded-3xl">
            <h3 className="text-white">{genre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
